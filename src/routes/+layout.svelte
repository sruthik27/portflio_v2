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
  import { page } from '$app/state';
  import { initEasterEggs } from '$lib/utils/easterEggs.js';
  import { setupGlobalAudioUnlock } from '$lib/utils/audio.js';
  import { initNocCursor } from '$lib/utils/cursor.js';
  import { initPanelTilt } from '$lib/utils/panelTilt.js';

  let { children } = $props();

  // Standalone routes (resume, etc.) render without portfolio chrome.
  const isStandalone = $derived(page.url.pathname.startsWith('/resume'));

  // Initialize activeSection if empty
  $effect(() => {
    if (!activeSection.value) {
      activeSection.value = 'hero';
    }
  });

  onMount(() => {
    // Skip portfolio-wide setup on standalone pages.
    if (page.url.pathname.startsWith('/resume')) return;

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

    initEasterEggs();
    const disposeCursor = initNocCursor();
    const disposeTilt = initPanelTilt();

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      clearTimeout(idleTimeout);
      disposeCursor();
      disposeTilt();
    };
  });
  // Apply global body classes reactively
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('mode-executive', executiveMode.value);
      document.body.classList.toggle('is-idle', isIdle.value);
      document.body.classList.toggle('mode-standalone', isStandalone);
    }
  });
</script>

{#if !isStandalone}
  <a href="#hero" class="skip-link">Skip to content</a>

  <BootSequence />

  {#if bootComplete.value}
    <ParticleBackground />
  {/if}
{/if}

<div class="layout-wrapper" class:visible={bootComplete.value} class:layout-wrapper--standalone={isStandalone}>
  {#if !isStandalone}
    <TopBar />
    <TopNav />
    <MobileNav />
    <CommandPalette />

    {#if tourActive.value}
      <NocBotGuide />
    {/if}
  {/if}

  <main class="main-content" class:main-content--standalone={isStandalone} id="main">
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

  .layout-wrapper--standalone {
    padding-top: 0;
    animation: none;
    opacity: 1;
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

  .main-content--standalone {
    max-width: none;
    padding: 0;
  }

  @media (max-width: 768px) {
    .layout-wrapper {
      padding-left: 0;
      /* Leave room at the bottom for the fixed mobile nav so the footer and
         last bit of content aren't hidden underneath it. ~72px nav + safe-area. */
      padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
    }
    .layout-wrapper--standalone {
      /* Standalone routes (resume) don't render the mobile nav. */
      padding-bottom: 0;
    }
    .main-content {
      padding: 0 24px;
    }
    .main-content--standalone {
      padding: 0;
    }
  }
</style>
