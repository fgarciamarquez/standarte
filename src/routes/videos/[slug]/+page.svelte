<script>
  import { pathFor } from '$lib/siteData.js';

  export let data;
  $: video = data.video;

  const site = 'https://standarte.es';
  $: canonical = `${site}/videos/${video.slug}`;
  $: contentUrl = `${site}${video.src}`;
  $: thumbUrl = `${site}${video.thumb}`;

  // Datos estructurados VideoObject: lo que Google usa para indexar el vídeo.
  $: jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbUrl],
    uploadDate: video.uploadDate,
    contentUrl: contentUrl,
    embedUrl: canonical,
    publisher: {
      '@type': 'Organization',
      name: 'Standarte',
      url: site
    }
  };
  $: jsonLdString = `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`;
</script>

<svelte:head>
  <title>{video.title} | Standarte</title>
  <meta name="description" content={video.description} />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href={canonical} />
  <meta property="og:type" content="video.other" />
  <meta property="og:title" content={video.title} />
  <meta property="og:description" content={video.description} />
  <meta property="og:image" content={thumbUrl} />
  <meta property="og:video" content={contentUrl} />
  {@html jsonLdString}
</svelte:head>

<header class="video-header">
  <a class="brand" href={pathFor('es', 'home')} aria-label="Standarte"></a>
</header>

<main class="video-watch">
  <article class="video-watch-inner">
    <!-- Reproductor visible: es el contenido principal de la página de visualización. -->
    <div class="video-player">
      <!-- svelte-ignore a11y_media_has_caption -->
      <video controls playsinline preload="metadata" poster={video.thumb}>
        <source src={video.src} type="video/mp4" />
      </video>
    </div>

    <h1>{video.title}</h1>
    <p class="video-desc">{video.description}</p>

    <nav class="video-nav">
      {#if video.projectId}
        <a href={`/proyectos/${video.projectId}`} class="btn-back">
          ← Ver el proyecto completo
        </a>
      {:else}
        <a href={`${pathFor('es', 'home')}#custom`} class="btn-back">
          ← Ver toda la galería de stands 3D
        </a>
      {/if}
    </nav>
  </article>
</main>

<style>
  :global(html:has(.video-watch)),
  :global(html:has(.video-watch) body) {
    background-color: #f7f6f1;
  }

  .video-header {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    background: #16191c;
  }

  .video-watch {
    min-height: 70vh;
    padding: 40px 15px 80px;
  }

  .video-watch-inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .video-player {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
  }

  .video-player video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  h1 {
    font-family: 'Fraunces', serif;
    font-weight: 400;
    font-size: 28px;
    color: #1a1e21;
    margin: 28px 0 12px;
  }

  .video-desc {
    font-size: 17px;
    line-height: 1.6;
    color: #444;
    margin: 0 0 28px;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    background-color: var(--gold);
    color: #111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 15px;
    padding: 12px 24px;
    border-radius: 30px;
    transition: all 0.25s ease;
  }

  .btn-back:hover {
    background-color: #e0b000;
    transform: translateX(-3px);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 23px;
    }
  }
</style>
