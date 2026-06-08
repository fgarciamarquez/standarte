<script>
  import '../app.css';
  import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  $: if (browser && $page.data.lang) {
    localStorage.setItem('standarte_lang', $page.data.lang);
  }
</script>

<slot />
<WhatsAppButton />
