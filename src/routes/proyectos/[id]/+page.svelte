<script>
  import { onMount } from 'svelte';
  import { pathFor, copy, languages, languageLabels } from '$lib/siteData.js';

  export let data;
  $: project = data.project;

  let isScrolled = false;
  let activeImageIndex = -1;

  function handleScroll() {
    isScrolled = window.scrollY > 8;
  }

  onMount(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function openLightbox(index) {
    activeImageIndex = index;
  }

  function closeLightbox() {
    activeImageIndex = -1;
  }

  function nextImage() {
    if (activeImageIndex === -1) return;
    activeImageIndex = (activeImageIndex + 1) % project.images.length;
  }

  function prevImage() {
    if (activeImageIndex === -1) return;
    activeImageIndex = (activeImageIndex - 1 + project.images.length) % project.images.length;
  }

  function handleKeydown(event) {
    if (activeImageIndex === -1) return;
    if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'Escape') {
      closeLightbox();
    }
  }

  $: jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": `Diseño de Stand 3D para ${project.name} en ${project.location}`,
    "description": `Detalles del prototipo y diseño tridimensional de stand a medida para ${project.name} en ${project.location}.`,
    "url": `https://standarte.es/proyectos/${project.id}/`,
    "image": `https://standarte.es${project.image}`,
    "mainEntity": {
      "@type": "CreativeWork",
      "name": `Prototipo de Stand 3D - ${project.name}`,
      "creator": {
        "@type": "Organization",
        "name": "Standarte",
        "url": "https://standarte.es"
      },
      "locationCreated": {
        "@type": "Place",
        "name": project.location
      }
    }
  };
  $: jsonLdString = `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`;
</script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <title>Prototipo 3D {project.name} | Standarte</title>
  <meta name="description" content="Detalles del diseño tridimensional de stand a medida para {project.name} en {project.location}. Conoce su relación con nuestros valores arquitectónicos." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={`https://standarte.es/proyectos/${project.id}/`} />
  {@html jsonLdString}
</svelte:head>

<header class="site-header static-header">
  <nav class="nav" class:scrolled={isScrolled}>
    <a class="brand" href={pathFor('es', 'home')} aria-label="Standarte"></a>
    <div class="nav-links">
      <a href={pathFor('es', 'services')}>Servicios</a>
      <a href={`${pathFor('es', 'home')}#micro-stand`}>LuzPavilion</a>
      <a href={pathFor('es', 'custom')}>Galería</a>
      <a href={pathFor('es', 'noticias')}>Noticias</a>
      <a href={`${pathFor('es', 'home')}#contact`}>Contacto</a>
    </div>
  </nav>

  <div class="hero-subpage">
    <div class="hero-contents">
      <div class="project-meta-top">
        <span class="location-badge">{project.location}</span>
      </div>
      <h1>{project.name}</h1>
      <p class="hero-lead">Prototipo 3D y su relación con nuestros valores de diseño</p>
    </div>
  </div>
</header>

<main class="project-detail-main">
  <div class="breadcrumbs-container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href={pathFor('es', 'home')}>Inicio</a></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">Proyectos 3D</span></li>
        <li><span class="divider">/</span></li>
        <li><span class="current" aria-current="page">{project.name}</span></li>
      </ol>
    </nav>
  </div>

  <article class="project-container">
    <!-- Carta del Valor de Diseño y Textos -->
    <div class="values-card">
      <div class="gold-indicator"></div>
      <h2>{project.notes}</h2>
      <p class="intro-description">
        Cada stand diseñado por Standarte es el fruto de un análisis exhaustivo de marca y necesidades. A continuación, detallamos los principios del diseño para <strong>{project.name}</strong>.
      </p>
      <div class="values-content">
        {@html project.valuesText}
      </div>
      {#if project.web}
        <div class="project-web-link">
          <a href={project.web} target="_blank" rel="noopener noreferrer" class="btn-web">
            Visitar sitio oficial
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16" style="margin-left: 6px; display: inline;">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      {/if}
    </div>

    <!-- Título Galería -->
    <div class="gallery-title-wrapper">
      <h2>Galería de Vistas y Renders 3D</h2>
      <p>Haz clic sobre cualquier imagen para explorarla en alta definición.</p>
    </div>

    <!-- Grid de Imágenes del Proyecto -->
    <div class="project-gallery-grid">
      {#each project.images as imgUrl, index}
        <div class="gallery-item-wrap">
          <button type="button" class="gallery-item-btn" on:click={() => openLightbox(index)} aria-label={`Ver imagen ${index + 1} de ${project.name}`}>
            <img src={imgUrl} alt={`Vista del stand ${project.name} - ${index + 1}`} loading="lazy" />
            <span class="gallery-item-overlay">
              <span class="eye-icon-white"></span>
            </span>
          </button>
        </div>
      {/each}
    </div>

    <!-- Volver al Inicio -->
    <div class="back-navigation">
      <a href={`${pathFor('es', 'home')}#prototipos-3d`} class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="margin-right: 8px; display: inline; vertical-align: middle;">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Volver a la Página Principal
      </a>
    </div>
  </article>

  <!-- Lightbox Viewer -->
  {#if activeImageIndex !== -1}
    <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label="Visualizador de Render 3D" on:click={closeLightbox}>
      <button class="lightbox-nav prev" type="button" aria-label="Anterior" on:click|stopPropagation={prevImage}>‹</button>
      
      <div class="lightbox-window" on:click|stopPropagation>
        <button class="lightbox-close" type="button" aria-label="Cerrar" on:click={closeLightbox}>×</button>
        <img src={project.images[activeImageIndex]} alt={`Render de stand 3D ${activeImageIndex + 1} de ${project.name}`} class="lightbox-image" />
      </div>

      <button class="lightbox-nav next" type="button" aria-label="Siguiente" on:click|stopPropagation={nextImage}>›</button>
    </div>
  {/if}
</main>

<style>
  /* Cabecera y Navbar */
  .static-header {
    min-height: 400px !important;
    background: linear-gradient(180deg, rgba(22, 25, 28, 0.7) 0%, rgba(22, 25, 28, 0.9) 100%), url('/img/bg2.webp') fixed center center / cover no-repeat !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-subpage {
    max-width: var(--container);
    margin: 80px auto 0;
    padding: 0 15px;
    width: 100%;
    text-align: center;
  }

  .project-meta-top {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 16px;
  }

  .location-badge {
    background-color: var(--gold);
    color: #111;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .hero-contents h1 {
    font-size: 42px;
    color: #fff;
    margin: 0;
    font-weight: 700;
    line-height: 1.25;
    max-width: 960px;
    margin: 0 auto 10px;
    letter-spacing: -0.5px;
  }

  .hero-lead {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
  }

  /* Breadcrumbs */
  .project-detail-main {
    background-color: #16191c; /* Fondo oscuro premium */
    color: #fff;
    padding-bottom: 100px;
    min-height: 100vh;
  }

  .breadcrumbs-container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  .breadcrumbs ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 8px;
    font-size: 13px;
    color: #888;
  }

  .breadcrumbs a {
    color: #888;
    transition: color 0.2s ease;
  }

  .breadcrumbs a:hover {
    color: var(--gold);
  }

  .breadcrumbs .current {
    color: #ccc;
    font-weight: 700;
  }

  .breadcrumbs .divider {
    color: #444;
  }

  /* Contenedor del Proyecto */
  .project-container {
    max-width: var(--container);
    margin: 0 auto;
    padding: 30px 15px 0;
  }

  /* Carta de Valores */
  .values-card {
    background-color: #1a1e22;
    border-radius: 8px;
    padding: 45px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    margin-bottom: 50px;
  }

  .gold-indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    right: 0;
    background: linear-gradient(90deg, var(--gold) 0%, #e6b400 100%);
  }

  .values-card h2 {
    font-size: 26px;
    color: #fff;
    margin-bottom: 20px;
    font-family: 'Glegoo', serif;
  }

  .intro-description {
    font-size: 15px;
    color: #aaa;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .values-content {
    font-size: 15px;
    line-height: 1.8;
    color: #ddd;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 25px;
  }

  .values-content :global(strong) {
    color: var(--gold);
    font-weight: 600;
  }

  .project-web-link {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .btn-web {
    display: inline-flex;
    align-items: center;
    color: var(--gold);
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;
  }

  .btn-web:hover {
    color: #fff;
  }

  /* Título Galería */
  .gallery-title-wrapper {
    margin-bottom: 30px;
  }

  .gallery-title-wrapper h2 {
    font-size: 24px;
    color: #fff;
    margin: 0 0 8px;
    font-family: 'Glegoo', serif;
  }

  .gallery-title-wrapper p {
    font-size: 14px;
    color: #888;
    margin: 0;
  }

  /* Grid de Galería */
  .project-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 60px;
  }

  .gallery-item-wrap {
    aspect-ratio: 16 / 10;
    overflow: hidden;
    border-radius: 6px;
    background-color: #121417;
    border: 1px solid rgba(255, 255, 255, 0.03);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }

  .gallery-item-btn {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    cursor: pointer;
    position: relative;
    display: block;
    overflow: hidden;
  }

  .gallery-item-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gallery-item-btn:hover img {
    transform: scale(1.06);
  }

  .gallery-item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(22, 25, 28, 0.5);
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }

  .gallery-item-btn:hover .gallery-item-overlay {
    opacity: 1;
  }

  .eye-icon-white {
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: relative;
  }

  .eye-icon-white::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
  }

  /* Navegación */
  .back-navigation {
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 40px;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    background-color: transparent;
    color: #ccc;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 13px;
    padding: 12px 28px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 30px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-back:hover {
    border-color: var(--gold);
    color: var(--gold);
    background-color: rgba(255, 200, 0, 0.03);
    transform: translateX(-4px);
  }

  /* Lightbox */
  .lightbox-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    cursor: zoom-out;
  }

  .lightbox-window {
    position: relative;
    max-width: 90vw;
    max-height: 85vh;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    background: #000;
    border-radius: 6px;
    overflow: hidden;
    cursor: default;
  }

  .lightbox-image {
    display: block;
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
  }

  .lightbox-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 32px;
    height: 32px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    border: 0;
    border-radius: 50%;
    font-size: 20px;
    line-height: 32px;
    cursor: pointer;
    transition: background 0.2s ease;
    z-index: 100;
    text-align: center;
  }

  .lightbox-close:hover {
    background: var(--gold);
    color: #000;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    font-size: 32px;
    line-height: 46px;
    text-align: center;
    cursor: pointer;
    z-index: 10000;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .lightbox-nav:hover {
    background: var(--gold);
    color: #111;
    border-color: var(--gold);
    transform: translateY(-50%) scale(1.1);
  }

  .lightbox-nav.prev {
    left: 30px;
  }

  .lightbox-nav.next {
    right: 30px;
  }

  @media (max-width: 768px) {
    .values-card {
      padding: 30px 20px;
    }

    .hero-contents h1 {
      font-size: 32px;
    }

    .values-card h2 {
      font-size: 22px;
    }

    .project-gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 15px;
    }

    .lightbox-nav {
      width: 40px;
      height: 40px;
      font-size: 24px;
      line-height: 36px;
    }
    
    .lightbox-nav.prev {
      left: 10px;
    }

    .lightbox-nav.next {
      right: 10px;
    }
  }
</style>
