<script>
  import '../app.css';
  import '../brandTheme.css';
  import SchemaLocalBusiness from '$lib/components/SchemaLocalBusiness.svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';

  $: if (browser && $page.data.lang) {
    localStorage.setItem('standarte_lang', $page.data.lang);
    localStorage.setItem('preferredLanguage', $page.data.lang);
  }

  // Google Analytics en SPA: el gtag('config') de app.html solo cuenta la primera
  // carga. En cada navegación interna (sin recarga) enviamos manualmente un page_view.
  // Saltamos la navegación inicial ('enter'), ya contada por el config. gtag() siempre
  // existe (definido inline en app.html), así que el evento se encola en dataLayer y GA
  // lo procesa al cargar el script (respetando el Consent Mode).
  afterNavigate((nav) => {
    if (!browser || nav?.type === 'enter') return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: $page.url.pathname + $page.url.search,
      page_location: $page.url.href,
      page_title: document.title
    });
  });
</script>

<SchemaLocalBusiness />
<slot />
