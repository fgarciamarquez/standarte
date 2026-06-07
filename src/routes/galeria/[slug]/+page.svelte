<script>
  import Site from '$lib/components/Site.svelte';
  import { copy, pathFor } from '$lib/siteData.js';
  export let data;

  const project = data.project;
  const lang = 'es'; // Por defecto renderizamos en español ya que las slugs principales están basadas en el alt original.
  const currentCopy = copy[lang];
</script>

<svelte:head>
  <title>{project.alt} | Standarte Galería</title>
  <meta name="description" content={project.description?.es || currentCopy.seoDescription} />
  <link rel="canonical" href={`https://standarte.es/galeria/${data.slug}`} />
  <!-- Open Graph -->
  <meta property="og:title" content={project.alt} />
  <meta property="og:description" content={project.description?.es || currentCopy.seoDescription} />
  <meta property="og:image" content={`https://standarte.es/${project.full}`} />
  <meta property="og:url" content={`https://standarte.es/galeria/${data.slug}`} />
  <meta property="og:type" content="article" />
</svelte:head>

<!-- Reutilizamos el componente Site pasándole la sección custom y el initialLightboxSlug -->
<Site 
  section="custom" 
  lang={lang} 
  copy={currentCopy} 
  canonical={`https://standarte.es/galeria/${data.slug}`}
  initialLightboxSlug={data.slug} 
/>
