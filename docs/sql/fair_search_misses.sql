-- Búsquedas de feria que NO encontraron nada en el buscador de la portada.
-- Aplicado en Supabase el 22/10/2026 (migración `fair_search_misses`). Esto es la copia
-- de referencia, igual que docs/sql/client_project_price_history.sql.
--
-- Por qué existe: hasta esa fecha cada búsqueda fallida solo se enviaba por correo a
-- info@standarte.es y ahí moría. No había manera de saber qué buscaba la gente sin
-- encontrarlo, ni cuántas veces, ni si un fallo se repetía — que es justamente el dato que
-- dice qué ferias dar de alta y qué alias añadir al buscador (`fairAliases` en
-- src/lib/fairMatch.js). Lo destapó un cliente que buscó «OMD» y recibió un «esa feria no
-- consta en nuestra base de datos» teniendo la ficha publicada.
--
-- Escribe: static/admin/ajax_fair_request.php (y su espejo en admin/).
-- Lee:     static/admin/buscador.php (y su espejo), con la contraseña del panel.
--
-- Una fila por búsqueda fallida. NO se guarda la IP ni ningún dato personal, ni siquiera
-- su hash: el endpoint ya presumía de no recoger datos personales y eso se mantiene. La IP
-- solo se usa, hasheada y en un fichero temporal, para el límite de abuso por hora.

create table if not exists public.fair_search_misses (
  id          bigserial primary key,
  q           text not null,                       -- el texto tal cual se teclea (<=120)
  q_norm      text not null,                        -- normalizado, para agrupar variantes
  lang        text not null default 'es',
  page_url    text,
  created_at  timestamptz not null default now()
);

create index if not exists fair_search_misses_created_idx on public.fair_search_misses (created_at desc);
create index if not exists fair_search_misses_norm_idx    on public.fair_search_misses (q_norm);

-- RLS activo y SIN políticas: solo el servidor, que usa la service key, puede leer o
-- escribir. La clave anónima que viaja en el navegador no ve nada de esta tabla.
-- Por eso el panel agrupa en PHP y no con una vista: una vista no hereda la RLS de su
-- tabla, y expondría estos datos a través de PostgREST.
alter table public.fair_search_misses enable row level security;

comment on table public.fair_search_misses is
  'Búsquedas del buscador de ferias que no devolvieron resultado. Alimenta las altas de feria y los alias de src/lib/fairMatch.js. Sin datos personales.';


-- ---------------------------------------------------------------------------
-- Consultas útiles
-- ---------------------------------------------------------------------------

-- Lo más buscado y no encontrado en los últimos 90 días (lo que conviene dar de alta):
-- select q_norm, count(*) as veces, max(q) as muestra, min(created_at) as primera, max(created_at) as ultima
--   from fair_search_misses
--  where created_at > now() - interval '90 days'
--  group by q_norm
--  order by veces desc, ultima desc;

-- Una consulta concreta, para ver si sigue fallando después de arreglarla:
-- select created_at, q, lang, page_url from fair_search_misses
--  where q_norm like '%omd%' order by created_at desc;

-- Por idioma, para saber si el fallo es de una versión del sitio:
-- select lang, count(*) from fair_search_misses group by lang order by 2 desc;
