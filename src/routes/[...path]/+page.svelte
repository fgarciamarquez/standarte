<script>
  import Site from '$lib/components/Site.svelte';
  import Noticias from '../noticias/+page.svelte';
  export let data;
</script>

{#if data.section === 'noticias'}
  <Noticias {data} />
{:else}
  <Site {...data} />
{/if}
