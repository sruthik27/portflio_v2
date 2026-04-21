<script>
  import '$lib/styles/global.css';
  import TopBar from '$lib/components/TopBar.svelte';
  import TopNav from '$lib/components/TopNav.svelte';
  import MobileNav from '$lib/components/MobileNav.svelte';
  import CommandPalette from '$lib/components/CommandPalette.svelte';
  import BootSequence from '$lib/components/BootSequence.svelte';
  import ParticleBackground from '$lib/components/ParticleBackground.svelte';
  import NocBotGuide from '$lib/components/NocBotGuide.svelte';
  import { activeSection, bootComplete, executiveMode, isIdle, tourActive } from '$lib/stores.svelte.js';
  import { onMount } from 'svelte';
  import { initEasterEggs } from '$lib/utils/easterEggs.js';
  import { setupGlobalAudioUnlock } from '$lib/utils/audio.js';

  let { children } = $props();

  // Initialize activeSection if empty
  $effect(() => {
    if (!activeSection.value) {
      activeSection.value = 'hero';
    }
  });

  onMount(() => {
    setupGlobalAudioUnlock();
    
    let idleTimeout;
    const IDLE_TIME = 180000; // 3 minutes

    function resetIdle() {
      if (isIdle.value) isIdle.value = false;
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isIdle.value = true;
      }, IDLE_TIME);
    }

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('touchstart', resetIdle);
    window.addEventListener('scroll', resetIdle);
    resetIdle();

    // Initialize global easter egg listeners
    initEasterEggs();

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      clearTimeout(idleTimeout);
    };
  });
  // Apply global body classes reactively
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('mode-executive', executiveMode.value);
      document.body.classList.toggle('is-idle', isIdle.value);
    }
  });
</script>

<a href="#hero" class="skip-link">Skip to content</a>

<BootSequence />

{#if bootComplete.value}
  <ParticleBackground />
{/if}

<div class="layout-wrapper" class:visible={bootComplete.value}>
  <TopBar />
  <TopNav />
  <MobileNav />
  <CommandPalette />

  {#if tourActive.value}
    <NocBotGuide />
  {/if}

  <main class="main-content" id="main">
    {@render children()}
  </main>
</div>

<style>
  .layout-wrapper {
    opacity: 0;
    animation: layoutFadeIn 0.8s ease-out forwards;
    padding-left: 0;
    padding-top: calc(var(--topbar-height) + 45px); /* Space for TopBar + TopNav */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  @keyframes layoutFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .main-content {
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    padding: 0 4vw;
  }

  @media (max-width: 768px) {
    .layout-wrapper {
      padding-left: 0;
    }
    .main-content {
      padding: 0 24px;
    }
  }
</style>
