<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let labels;

  // Secuencia de videos corporativos y de proyectos (dinámicos por idioma)
  $: videos = labels.videos || [
    {
      src: '/img/video_standrte_presentacion_empresa.mp4',
      title: 'Presentaciones de empresas',
      subtitle: 'Nuestros talleres y proceso de fabricación de stands corporativos.'
    },
    {
      src: '/img/video_standarte_presentacion_vinos.mp4',
      title: 'Ferias en entornos históricos',
      subtitle: 'Diseño e ingeniería respetuosa en ubicaciones tradicionales e históricas.'
    },
    {
      src: '/img/video_standarte_andalucia.mp4',
      title: 'Celebraciones',
      subtitle: 'Espacios gourmet a medida para bodegas y eventos especiales.'
    },
    {
      src: '/img/video_standarte_feria_verano.mp4',
      title: 'Ferias al aire libre de gran formato',
      subtitle: 'Montajes de gran escala y carpas premium de alta resistencia.'
    }
  ];

  // Fondo de pantalla optimizado en AVIF a un 60% de compresión para el preloader
  let coverImage = '/img/video_standarte_portada.avif';

  let videoElement;
  let activeIndex = 0;
  let isPreloading = true;
  let isPlaying = true;
  let transitionClass = '';
  let currentTime = 0;
  let duration = 0;

  // Reactividad Svelte: porcentaje de barra de progreso del video activo
  $: progressPercent = duration ? (currentTime / duration) * 100 : 0;

  function handleVideoEnded() {
    transitionClass = 'fade-out';
    setTimeout(() => {
      activeIndex = (activeIndex + 1) % videos.length;
      transitionClass = 'fade-in';
      if (videoElement) {
        videoElement.src = videos[activeIndex].src;
        videoElement.load();
        videoElement.play().catch(() => {
          isPlaying = false;
        });
      }
    }, 400);
  }

  function handleLoadedData() {
    isPreloading = false;
    transitionClass = 'fade-in';
  }

  function selectVideo(index) {
    if (activeIndex === index) return;
    transitionClass = 'fade-out';
    setTimeout(() => {
      activeIndex = index;
      transitionClass = 'fade-in';
      if (videoElement) {
        isPreloading = true;
        videoElement.src = videos[activeIndex].src;
        videoElement.load();
        videoElement.play().then(() => {
          isPlaying = true;
        }).catch(() => {
          isPlaying = false;
        });
      }
    }, 400);
  }

  function togglePlay() {
    if (!videoElement) return;
    if (isPlaying) {
      videoElement.pause();
      isPlaying = false;
    } else {
      videoElement.play().then(() => {
        isPlaying = true;
      });
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      coverImage = '/img/video_standarte_portada-mobile.avif';
    }
    // Carga perezosa y asíncrona de videos para asegurar que no interfiera en la carga crítica de la web
    if (videoElement) {
      videoElement.src = videos[activeIndex].src;
      videoElement.load();
      videoElement.play().then(() => {
        isPlaying = true;
      }).catch(err => {
        console.log('Autoplay prevenido por política del navegador.', err);
        isPlaying = false;
      });
    }
  });
</script>

<section id="micro-stand" class="section micro-stand">
  <!-- Encabezado de la Sección -->
  <div class="section-header">
    <h2>{labels.title}</h2>
    <span></span>
    {#if labels.subtitle}
      <p style="font-style: italic;">{labels.subtitle}</p>
    {/if}
  </div>

  <!-- Escenario de Video de Alta Fidelidad -->
  <div class="video-stage">
    
    <!-- Imagen de Portada AVIF / Preloader no bloqueante -->
    {#if isPreloading}
      <div class="cover-image" style="background-image: url({coverImage})" transition:fade={{ duration: 300 }}>
        <div class="preloader-spinner"></div>
      </div>
    {/if}

    <!-- Reproductor HTML5 Asíncrono (Preload None) -->
    <video
      bind:this={videoElement}
      class="video-player {transitionClass}"
      poster={coverImage}
      preload="none"
      muted
      playsinline
      bind:currentTime={currentTime}
      bind:duration={duration}
      on:ended={handleVideoEnded}
      on:loadeddata={handleLoadedData}
    >
      <track kind="captions" />
    </video>

    <!-- Overlay de Mandos de Control -->
    <div class="video-overlay">
      <div class="video-controls">
        <button type="button" class="btn-control play-pause" on:click={togglePlay}>
          {isPlaying ? `⏸ ${labels.pause || 'PAUSA'}` : `▶ ${labels.play || 'REPRODUCIR'}`}
        </button>
        <a href="https://luzpavilion.es" target="_blank" rel="noopener noreferrer" class="btn-control btn-yellow">
          {labels.visitWeb || 'VISITAR WEB ESPECÍFICA'}
        </a>
      </div>
    </div>

    <!-- Navegación por Pistas (Barra de progreso de carrusel) -->
    <div class="video-navigation">
      {#each videos as video, index}
        <button
          type="button"
          class="nav-dot"
          class:active={activeIndex === index}
          on:click={() => selectVideo(index)}
        >
          <span class="dot-number">0{index + 1}</span>
          <span class="dot-title">{video.title}</span>
          <span class="dot-progress-bar">
            <span class="dot-progress-fill" style="width: {activeIndex === index ? progressPercent + '%' : '0%'}"></span>
          </span>
        </button>
      {/each}
    </div>

  </div>
</section>

<style>
  /* ESTILOS PREMIUM PARA EL REPRODUCTOR DE VIDEO LUZPAVILION */
  .video-stage {
    position: relative;
    width: 100%;
    min-height: 48rem;
    height: 48rem;
    overflow: hidden;
    background-color: #0d1013;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
  }

  .video-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .video-player.fade-out {
    opacity: 0;
  }

  .video-player.fade-in {
    opacity: 1;
  }

  .cover-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .preloader-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 200, 0, 0.1);
    border-radius: 50%;
    border-top-color: #ffc800;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .video-overlay {
    position: absolute;
    bottom: 6.5rem;
    left: 3rem;
    right: 3rem;
    z-index: 4;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    pointer-events: none;
  }

  .video-controls {
    display: flex;
    gap: 12px;
    pointer-events: auto;
  }

  .btn-control {
    background: rgba(17, 20, 24, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    font-family: inherit;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 12px 22px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .btn-control:hover {
    border-color: #ffc800;
    color: #ffc800;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 200, 0, 0.15);
  }

  .btn-control.btn-yellow {
    background: #ffc800;
    color: #0d1013;
    border-color: #ffc800;
  }

  .btn-control.btn-yellow:hover {
    background: #e6b400;
    border-color: #e6b400;
    color: #0d1013;
    box-shadow: 0 4px 15px rgba(255, 200, 0, 0.35);
  }

  .video-navigation {
    position: absolute;
    bottom: 2rem;
    left: 3rem;
    right: 3rem;
    z-index: 5;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    pointer-events: auto;
  }

  .nav-dot {
    background: transparent;
    border: 0;
    text-align: left;
    padding: 0;
    color: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .nav-dot:hover, .nav-dot.active {
    color: #ffffff;
  }

  .dot-number {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #ffc800;
    margin-bottom: 6px;
  }

  .dot-title {
    display: block;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dot-progress-bar {
    display: block;
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    overflow: hidden;
  }

  .dot-progress-fill {
    display: block;
    height: 100%;
    background: #ffc800;
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  /* MEDIA QUERIES RESPONSIVAS */
  @media (max-width: 992px) {
    .video-overlay {
      bottom: 8rem;
    }
  }

  @media (max-width: 768px) {
    .video-stage {
      height: 36rem;
      min-height: 36rem;
    }
    .video-overlay {
      bottom: 8rem;
      left: 1.5rem;
      right: 1.5rem;
    }
    .video-navigation {
      left: 1.5rem;
      right: 1.5rem;
      bottom: 1.5rem;
      gap: 12px;
    }
    .dot-title {
      display: none;
    }
    .btn-control {
      padding: 10px 18px;
      font-size: 16px;
    }
  }
</style>
