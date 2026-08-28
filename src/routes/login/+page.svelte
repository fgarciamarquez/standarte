<script>
  // Acceso y registro de constructores asociados de StandQuote (fase 2).
  // Autenticación real sobre Supabase Auth (src/lib/sqAuth.js): registro con
  // perfil de constructor (empresa, ciudad, teléfono), inicio de sesión y un
  // área privada mínima a la espera del panel de leads. Diseño y textos propios
  // de la marca (Inconsolata + punto lima + acento azul petróleo).
  import { onMount } from 'svelte';
  import { BRAND } from '$lib/brand.js';
  import { sqSignUp, sqSignIn, sqSignOut, sqCurrentUser } from '$lib/sqAuth.js';

  let mode = 'login'; // 'login' | 'registro'
  let user = null;
  let checking = true;

  // Campos compartidos y de registro.
  let email = '', password = '', company = '', city = '', phone = '';
  let sending = false, error = '', notice = '';

  onMount(async () => {
    user = await sqCurrentUser();
    checking = false;
  });

  async function submit() {
    error = ''; notice = ''; sending = true;
    try {
      if (mode === 'login') {
        user = await sqSignIn(email.trim(), password);
      } else {
        if (!company.trim() || !city.trim()) { error = 'Indica tu empresa y tu ciudad.'; return; }
        const r = await sqSignUp({ email: email.trim(), password, company: company.trim(), city: city.trim(), phone: phone.trim() });
        if (r.needsConfirmation) {
          notice = 'Te hemos enviado un correo de confirmación. Valida tu email y vuelve a entrar.';
          mode = 'login';
        } else {
          user = await sqCurrentUser();
        }
      }
    } catch (e) {
      const m = String(e.message || e);
      error = m.includes('Invalid login') ? 'Email o contraseña incorrectos.'
        : m.includes('already registered') ? 'Ese email ya tiene cuenta: inicia sesión.'
        : m.includes('at least') || m.includes('Password') ? 'La contraseña debe tener al menos 6 caracteres.'
        : 'No se pudo completar la operación. Inténtalo de nuevo. (' + m + ')';
    } finally {
      sending = false;
    }
  }

  function logout() { sqSignOut(); user = null; }
</script>

<svelte:head>
  <title>Login/Registro | {BRAND.name}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="sq-login-page">
  <a class="sq-login-brand" href="/">standquote<span class="sq-login-dot" aria-hidden="true"></span></a>

  {#if checking}
    <p class="sq-muted">Cargando…</p>
  {:else if user}
    <!-- Área privada mínima: la antesala del panel de leads de la fase 2. -->
    <h1>Hola, {user.user_metadata?.company || user.email}</h1>
    <p class="sq-lead-text">Tu cuenta de constructor está activa.</p>
    <div class="sq-panel-card">
      <p><strong>Panel de solicitudes en preparación.</strong></p>
      <p>Muy pronto recibirás aquí las solicitudes de stands de tu ciudad y podrás enviar tus propuestas. Te avisaremos por email en cuanto se active.</p>
      <ul class="sq-profile">
        <li><span>Empresa</span>{user.user_metadata?.company || '—'}</li>
        <li><span>Ciudad</span>{user.user_metadata?.city || '—'}</li>
        <li><span>Email</span>{user.email}</li>
        {#if user.user_metadata?.phone}<li><span>Teléfono</span>{user.user_metadata.phone}</li>{/if}
      </ul>
    </div>
    <p><button class="sq-link-btn" type="button" on:click={logout}>Cerrar sesión</button></p>
    <p><a class="sq-login-back" href="/">← Volver al inicio</a></p>
  {:else}
    <h1>Área de constructores</h1>
    <p class="sq-lead-text">Recibe solicitudes de stands en tu ciudad y envía tus propuestas.</p>

    <div class="sq-auth-card">
      <div class="sq-auth-tabs" role="tablist">
        <button type="button" role="tab" class:active={mode === 'login'} aria-selected={mode === 'login'} on:click={() => { mode = 'login'; error = ''; }}>Iniciar sesión</button>
        <button type="button" role="tab" class:active={mode === 'registro'} aria-selected={mode === 'registro'} on:click={() => { mode = 'registro'; error = ''; }}>Crear cuenta</button>
      </div>

      <form on:submit|preventDefault={submit}>
        {#if mode === 'registro'}
          <label>Empresa constructora
            <input type="text" bind:value={company} autocomplete="organization" required />
          </label>
          <label>Ciudad principal
            <input type="text" bind:value={city} placeholder="Madrid, Lisboa, París…" required />
          </label>
          <label>Teléfono (opcional)
            <input type="tel" bind:value={phone} autocomplete="tel" />
          </label>
        {/if}
        <label>Email
          <input type="email" bind:value={email} autocomplete="email" required />
        </label>
        <label>Contraseña
          <input type="password" bind:value={password} minlength="6" autocomplete={mode === 'login' ? 'current-password' : 'new-password'} required />
        </label>

        {#if error}<p class="sq-error" role="alert">{error}</p>{/if}
        {#if notice}<p class="sq-notice">{notice}</p>{/if}

        <button class="sq-submit" type="submit" disabled={sending}>
          {sending ? 'Un momento…' : mode === 'login' ? 'Entrar' : 'Crear cuenta de constructor'}
        </button>
      </form>

      {#if mode === 'registro'}
        <p class="sq-small">Al crear la cuenta aceptas que StandQuote te haga llegar solicitudes de presupuesto de stands. Podrás darte de baja cuando quieras escribiendo a {BRAND.email}.</p>
      {/if}
    </div>
    <p><a class="sq-login-back" href="/">← Volver al inicio</a></p>
  {/if}
</main>

<style>
  .sq-login-page {
    max-width: 560px;
    margin: 0 auto;
    padding: 60px 20px 90px;
    text-align: center;
    font-family: 'Inconsolata', monospace;
    color: #16242c;
  }
  .sq-login-brand {
    display: inline-flex;
    align-items: flex-start;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #16242c;
    text-decoration: none;
    margin-bottom: 30px;
  }
  .sq-login-dot { width: 11px; height: 11px; border-radius: 50%; background: #a3e635; margin-left: 3px; margin-top: 2px; }
  h1 { font-size: 30px; margin: 0 0 10px; }
  .sq-lead-text { margin: 0 0 26px; font-size: 17px; color: #444; }
  .sq-muted { color: #888; }

  .sq-auth-card {
    background: #f7f6f1;
    border: 1px solid #e7e7e3;
    border-radius: 12px;
    padding: 0 0 24px;
    text-align: left;
    overflow: hidden;
  }
  .sq-auth-tabs { display: flex; }
  .sq-auth-tabs button {
    flex: 1;
    appearance: none;
    border: none;
    border-bottom: 2px solid #e0ded6;
    background: #eceae4;
    padding: 14px 0;
    font-family: inherit;
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #6a6a64;
    cursor: pointer;
  }
  .sq-auth-tabs button.active {
    background: #f7f6f1;
    border-bottom-color: #0e7490;
    color: #0e7490;
  }
  form { display: flex; flex-direction: column; gap: 14px; padding: 22px 22px 0; }
  label { display: flex; flex-direction: column; gap: 5px; font-weight: 700; font-size: 14px; }
  input {
    font-family: inherit;
    font-size: 16px;
    padding: 10px 12px;
    border: 1px solid #d5d3cb;
    border-radius: 8px;
    background: #fff;
  }
  input:focus { outline: 2px solid #0e7490; border-color: #0e7490; }
  .sq-submit {
    margin-top: 6px;
    appearance: none;
    border: none;
    border-radius: 8px;
    background: #0e7490;
    color: #fff;
    font-family: inherit;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 13px 0;
    cursor: pointer;
  }
  .sq-submit:hover { background: #0a5a70; }
  .sq-submit:disabled { opacity: 0.6; cursor: default; }
  .sq-error { margin: 0; color: #b3261e; font-size: 14px; }
  .sq-notice { margin: 0; color: #0e7490; font-size: 14px; font-weight: 700; }
  .sq-small { margin: 14px 22px 0; font-size: 12.5px; color: #777; line-height: 1.5; }

  .sq-panel-card {
    background: #f7f6f1;
    border: 1px solid #e7e7e3;
    border-radius: 12px;
    padding: 22px;
    text-align: left;
    line-height: 1.6;
  }
  .sq-profile { list-style: none; margin: 14px 0 0; padding: 0; }
  .sq-profile li { display: flex; gap: 10px; padding: 6px 0; border-top: 1px solid #e7e7e3; }
  .sq-profile li span { min-width: 90px; font-weight: 700; color: #6a6a64; }
  .sq-link-btn {
    appearance: none; border: none; background: none;
    font-family: inherit; font-weight: 700; color: #0e7490;
    cursor: pointer; text-decoration: underline; font-size: 15px;
  }
  .sq-login-back { color: #0e7490; text-decoration: none; font-weight: 700; }
</style>
