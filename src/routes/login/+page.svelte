<script>
  // Página puente del "Login/Registro" del menú de StandQuote: el área de
  // constructores asociados (alta, panel de leads) llega con la fase 2 del
  // marketplace. Mientras tanto, la página presenta el acceso y recoge interés
  // por email, con la identidad de la marca (Inconsolata + punto lima).
  import { BRAND } from '$lib/brand.js';
</script>

<svelte:head>
  <title>Login/Registro | {BRAND.name}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="sq-login-page">
  <a class="sq-login-brand" href="/">standquote<span class="sq-login-dot" aria-hidden="true"></span></a>
  <h1>Login / Registro</h1>
  <p class="sq-login-lead">
    El área de constructores asociados está en preparación.<br />
    <span class="sq-login-en">The partner builders area is coming soon.</span>
  </p>
  <p>
    ¿Quieres unirte a la red y recibir solicitudes de stands en tu ciudad?<br />
    Escríbenos y te avisamos en cuanto abra el registro:
  </p>
  <p><a class="sq-login-cta" href="mailto:{BRAND.email}">{BRAND.email}</a></p>
  <p><a class="sq-login-back" href="/">← Volver al inicio</a></p>
</main>

<style>
  .sq-login-page {
    max-width: 640px;
    margin: 0 auto;
    padding: 70px 20px 90px;
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
    margin-bottom: 34px;
  }
  .sq-login-dot {
    width: 11px; height: 11px; border-radius: 50%;
    background: #a3e635; margin-left: 3px; margin-top: 2px;
  }
  h1 { font-size: 34px; margin: 0 0 18px; }
  .sq-login-lead { font-size: 18px; line-height: 1.6; }
  .sq-login-en { color: #777; font-size: 15px; }
  p { line-height: 1.65; }
  .sq-login-cta {
    display: inline-block;
    background: #0e7490; color: #fff;
    padding: 12px 26px; border-radius: 8px;
    font-weight: 700; text-decoration: none;
  }
  .sq-login-cta:hover { background: #0a5a70; }
  .sq-login-back { color: #0e7490; text-decoration: none; font-weight: 700; }
</style>
