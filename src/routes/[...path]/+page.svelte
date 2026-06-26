<script>
  import Site from '$lib/components/Site.svelte';
  import Noticias from '../blog/+page.svelte';
  import Feria from '$lib/components/Feria.svelte';
  import ProjectPage from '../proyectos/[id]/+page.svelte';
  import Precios from '$lib/components/Precios.svelte';
  export let data;
</script>

{#if data.section === 'noticias'}
  <Noticias {data} />
{:else if data.section === 'feria'}
  <Feria {data} />
{:else if data.section === 'precios'}
  <Precios {data} />
{:else if data.section === 'project'}
  <ProjectPage {data} forcedLang="ja" />
{:else}
  <Site {...data} />
{/if}
