<script>
  export let langCode;
  export let size = 20;
</script>

{#if langCode === 'es'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="512" height="128" fill="#AD1519"/>
    <rect y="128" width="512" height="256" fill="#FCD116"/>
    <rect y="384" width="512" height="128" fill="#AD1519"/>
  </svg>
{:else if langCode === 'en'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="512" height="512" fill="#012169"/>
    <path d="M0 0 L512 512 M0 512 L512 0" stroke="#FFF" stroke-width="60"/>
    <path d="M0 0 L512 512 M0 512 L512 0" stroke="#C8102E" stroke-width="36"/>
    <path d="M256 0 V512 M0 256 H512" stroke="#FFF" stroke-width="100"/>
    <path d="M256 0 V512 M0 256 H512" stroke="#C8102E" stroke-width="60"/>
  </svg>
{:else if langCode === 'de'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="512" height="170.7" fill="#000"/>
    <rect y="170.7" width="512" height="170.7" fill="#D00"/>
    <rect y="341.4" width="512" height="170.7" fill="#FFCE00"/>
  </svg>
{:else if langCode === 'pt'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="204.8" height="512" fill="#006600"/>
    <rect x="204.8" width="307.2" height="512" fill="#FF0000"/>
    <circle cx="204.8" cy="256" r="45" fill="#FFFF00"/>
    <circle cx="204.8" cy="256" r="30" fill="#FFFFFF" stroke="#FF0000" stroke-width="6"/>
    <rect x="199.8" y="246" width="10" height="20" fill="#0000FF"/>
  </svg>
{:else if langCode === 'fr'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="170.7" height="512" fill="#00267F"/>
    <rect x="170.7" width="170.7" height="512" fill="#FFF"/>
    <rect x="341.3" width="170.7" height="512" fill="#F31830"/>
  </svg>
{:else if langCode === 'it'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.15);" aria-hidden="true">
    <rect width="170.7" height="512" fill="#009246"/>
    <rect x="170.7" width="170.7" height="512" fill="#FFF"/>
    <rect x="341.3" width="170.7" height="512" fill="#CE2B37"/>
  </svg>
{:else if langCode === 'zh'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="512" height="512" fill="#DE2910"/>
    <polygon points="120,70 135,115 180,115 145,140 160,185 120,160 80,185 95,140 60,115 105,115" fill="#FFDE00"/>
  </svg>
{:else if langCode === 'hi'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0;" aria-hidden="true">
    <rect width="512" height="170.7" fill="#FF9933"/>
    <rect y="170.7" width="512" height="170.7" fill="#FFF"/>
    <rect y="341.4" width="512" height="170.7" fill="#128807"/>
    <circle cx="256" cy="256" r="35" fill="none" stroke="#000080" stroke-width="6"/>
    <circle cx="256" cy="256" r="8" fill="#000080"/>
  </svg>
{:else if langCode === 'ko'}
  <svg viewBox="0 0 512 512" width={size} height={size} style="border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.15);" aria-hidden="true">
    <rect width="512" height="512" fill="#FFF"/>
    <path d="M256 128 A128 128 0 0 1 256 384 A128 128 0 0 1 256 128" fill="#CD2E3A"/>
    <path d="M256 256 A64 64 0 0 1 256 384 A64 64 0 0 1 256 256" fill="#0047A0"/>
    <path d="M256 128 A64 64 0 0 0 256 256 A64 64 0 0 0 256 128" fill="#CD2E3A"/>
    <path d="M256 256 A128 128 0 0 1 256 384" fill="#0047A0"/>
    <rect x="100" y="100" width="40" height="12" fill="#000" transform="rotate(45 100 100)"/>
    <rect x="370" y="100" width="40" height="12" fill="#000" transform="rotate(-45 370 100)"/>
    <rect x="100" y="370" width="40" height="12" fill="#000" transform="rotate(-45 100 370)"/>
    <rect x="370" y="370" width="40" height="12" fill="#000" transform="rotate(45 370 370)"/>
  </svg>
{/if}
