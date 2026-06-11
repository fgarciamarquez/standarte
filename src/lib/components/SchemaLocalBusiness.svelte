<script>
  import { localBusinessSchema as schema } from '$lib/seo.js';
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
