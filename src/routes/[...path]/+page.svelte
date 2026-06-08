<script>
  import Site from '$lib/components/Site.svelte';
  import Noticias from '../noticias/+page.svelte';
  import Feria from '$lib/components/Feria.svelte';
  export let data;
</script>

{#if data.section === 'noticias'}
  <Noticias {data} />
{:else if data.section === 'feria'}
  <Feria {data} />
{:else}
  <Site {...data} />
{/if}
