<script>
  // Carrusel de fundido de los renders 3D de la Galería (sin vídeos) para las paralelas de
  // constructor: 3 s por imagen, ciclo infinito. En el HTML prerenderizado se ve la primera.
  import { onMount, onDestroy } from 'svelte';
  import { galleryRenders, RENDERS_DIR, renderCaption } from '$lib/galleryRenders.js';
  import { pathFor } from '$lib/siteData.js';

  export let lang = 'es';
  const HOLD = 3000;
  const MORE = { es: 'Ver la galería completa', en: 'See the full gallery', pt: 'Ver a galeria completa', de: 'Zur vollständigen Galerie', fr: 'Voir toute la galerie', it: 'Vedi la galleria completa', nl: 'Bekijk de volledige galerij', zh: '查看完整图库', hi: 'पूरी गैलरी देखें', ko: '전체 갤러리 보기', ja: 'ギャラリーをすべて見る' };
  let i = 0;
  let timer;
  onMount(() => { timer = setInterval(() => { i = (i + 1) % galleryRenders.length; }, HOLD); });
  onDestroy(() => clearInterval(timer));
</script>

<figure class="render-fader" aria-roledescription="carousel">
  <div class="rf-stage">
    {#each galleryRenders as r, k}
      <img src={`${RENDERS_DIR}${r.f}-800.webp`} srcset={`${RENDERS_DIR}${r.f}-800.webp 800w, ${RENDERS_DIR}${r.f}.webp 1600w`} sizes="(max-width: 760px) 100vw, 720px"
        width={r.w} height={r.h} alt={renderCaption(r, lang)} class:on={k === i} class:contain={r.fit === 'contain'}
        loading={k === 0 ? 'eager' : 'lazy'} decoding="async" aria-hidden={k !== i} />
    {/each}
  </div>
  <figcaption>
    <span aria-live="off">{renderCaption(galleryRenders[i], lang)}</span>
    <a href={pathFor(lang, 'galeria')} data-sveltekit-reload>{MORE[lang] || MORE.en} →</a>
  </figcaption>
</figure>

<style>
  .render-fader { margin: 28px 0; border-radius: 12px; overflow: hidden; background: #fff; border: 1px solid rgba(22, 25, 28, 0.06); box-shadow: 0 8px 24px rgba(22, 25, 28, 0.05); }
  .rf-stage { position: relative; aspect-ratio: 16 / 9; background: #1b1b1b; }
  .rf-stage img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 1s ease-in-out; }
  .rf-stage img.contain { object-fit: contain; background: #fff; }
  .rf-stage img.on { opacity: 1; }
  figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 16px; padding: 12px 16px 14px; font-size: 14px; line-height: 1.45; color: #444; }
  figcaption span { flex: 1 1 320px; min-height: 2.9em; }
  figcaption a { color: #9a7a00; text-decoration: underline; text-underline-offset: 3px; white-space: nowrap; align-self: flex-end; }
</style>
