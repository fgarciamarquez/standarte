-- Histórico de precios de los proyectos de cliente. Aplicado en Supabase el 29/09/2026
-- (migración «client_project_price_history»). Copia de referencia; la fuente de verdad es la base de datos.
--
-- Qué hace: cada cambio del presupuesto de un proyecto (alta, edición o baja de una partida;
-- cambio del descuento, de su etiqueta o plazo, del IVA o del IRPF) guarda una VERSIÓN con
-- las partidas y los totales antes de impuestos. La versión anterior se cierra con la fecha
-- del cambio (valid_until = fecha del siguiente cambio; NULL = vigente). Al borrar un
-- proyecto se registra su último estado y la versión queda cerrada con «proyecto borrado».
-- project_id no lleva clave foránea: el histórico sobrevive al borrado del proyecto.
--
-- Consultas útiles (Supabase → SQL editor, o desde una sesión con acceso a la base):
--
--   Histórico de un proyecto por referencia o cliente (también si ya no existe):
--     select project_ref, client_name, subtotal, discount_amount, total_base,
--            valid_from at time zone 'Europe/Madrid' as desde,
--            valid_until at time zone 'Europe/Madrid' as hasta, source
--       from client_project_price_history
--      where project_ref ilike '%meermeat%' or client_name ilike '%meermeat%'
--      order by valid_from;
--
--   Partidas de una versión concreta:
--     select jsonb_array_elements(items) from client_project_price_history where id = '<id>';
--
--   Columnas: subtotal = suma de partidas antes de impuestos (el «Subtotal» que ve el cliente);
--   total_base = subtotal - descuento, antes de impuestos; items = partidas (concepto es/en, importe, orden).

create table if not exists public.client_project_price_history (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  project_ref text,
  client_name text,
  title_es text,
  fair_slug text,
  items jsonb not null default '[]'::jsonb,
  item_count integer not null default 0,
  subtotal numeric(12,2) not null default 0,
  discount_amount numeric(12,2) not null default 0,
  discount_label_es text,
  discount_deadline date,
  total_base numeric(12,2) not null default 0,
  iva_rate numeric,
  irpf_rate numeric,
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  source text not null,
  ended_by text,
  fingerprint text not null
);
create index if not exists cpph_project_valid_idx on public.client_project_price_history (project_id, valid_from desc);
create index if not exists cpph_ref_idx on public.client_project_price_history (lower(project_ref));
create index if not exists cpph_client_idx on public.client_project_price_history (lower(client_name));
alter table public.client_project_price_history enable row level security;

create or replace function public.cpx_price_snapshot(p_project uuid, p_source text)
returns void language plpgsql security definer set search_path = public as $$
declare
  p record; v_items jsonb; v_count integer; v_subtotal numeric(12,2); v_fp text; v_last record;
begin
  select id, ref, client_name, title_es, fair_slug, discount_amount, discount_label_es, discount_deadline, iva_rate, irpf_rate
    into p from public.client_projects where id = p_project;
  if not found then return; end if;
  select coalesce(jsonb_agg(jsonb_build_object('concept_es', concept_es, 'concept_en', concept_en, 'amount', amount, 'sort_order', sort_order) order by sort_order, concept_es), '[]'::jsonb),
         count(*), coalesce(sum(amount), 0)
    into v_items, v_count, v_subtotal
    from public.client_project_budget_items where project_id = p_project;
  v_fp := md5(v_items::text || '|' || coalesce(p.discount_amount, 0)::text || '|' || coalesce(p.discount_label_es, '') || '|' || coalesce(p.discount_deadline::text, '') || '|' || coalesce(p.iva_rate, 0)::text || '|' || coalesce(p.irpf_rate, 0)::text);
  select id, fingerprint into v_last from public.client_project_price_history
   where project_id = p_project and valid_until is null order by valid_from desc limit 1;
  if found and v_last.fingerprint = v_fp then return; end if;
  if found then
    update public.client_project_price_history set valid_until = now(), ended_by = p_source where id = v_last.id;
  end if;
  insert into public.client_project_price_history
    (project_id, project_ref, client_name, title_es, fair_slug, items, item_count, subtotal, discount_amount, discount_label_es, discount_deadline, total_base, iva_rate, irpf_rate, source, fingerprint)
  values
    (p.id, p.ref, p.client_name, p.title_es, p.fair_slug, v_items, v_count, v_subtotal, coalesce(p.discount_amount, 0), p.discount_label_es, p.discount_deadline,
     v_subtotal - coalesce(p.discount_amount, 0), p.iva_rate, p.irpf_rate, p_source, v_fp);
end $$;

create or replace function public.cpx_trg_budget_item() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.cpx_price_snapshot(coalesce(new.project_id, old.project_id), 'client_project_budget_items ' || tg_op);
  return null;
end $$;
drop trigger if exists cpx_price_history_items on public.client_project_budget_items;
create trigger cpx_price_history_items
  after insert or update or delete on public.client_project_budget_items
  for each row execute function public.cpx_trg_budget_item();

create or replace function public.cpx_trg_project_price() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.cpx_price_snapshot(new.id, 'client_projects UPDATE');
  return null;
end $$;
drop trigger if exists cpx_price_history_project on public.client_projects;
create trigger cpx_price_history_project
  after update on public.client_projects
  for each row
  when (old.discount_amount is distinct from new.discount_amount
     or old.discount_label_es is distinct from new.discount_label_es
     or old.discount_deadline is distinct from new.discount_deadline
     or old.iva_rate is distinct from new.iva_rate
     or old.irpf_rate is distinct from new.irpf_rate)
  execute function public.cpx_trg_project_price();

create or replace function public.cpx_trg_project_delete() returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public.cpx_price_snapshot(old.id, 'client_projects DELETE');
  update public.client_project_price_history set valid_until = now(), ended_by = 'client_projects DELETE (proyecto borrado)'
   where project_id = old.id and valid_until is null;
  return old;
end $$;
drop trigger if exists cpx_price_history_project_delete on public.client_projects;
create trigger cpx_price_history_project_delete
  before delete on public.client_projects
  for each row execute function public.cpx_trg_project_delete();

-- Arranque: una versión por proyecto existente (hecho el 29/09/2026 para los 7 proyectos de entonces).
-- select public.cpx_price_snapshot(id, 'backfill') from public.client_projects;
