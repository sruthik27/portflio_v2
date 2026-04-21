<script>
  import { activeSection } from '$lib/stores.svelte.js';
  import { playPing } from '$lib/utils/audio.js';

  const navItems = [
    { id: 'hero',        label: 'STATUS',     color: 'var(--green)' },
    { id: 'about',       label: 'ABOUT',      color: '#4a90e2' },
    { id: 'domains',     label: 'DOMAINS',    color: 'var(--amber)' },
    { id: 'experience',  label: 'EXPERIENCE', color: 'var(--cyan)' },
    { id: 'projects',    label: 'PROJECTS',   color: 'var(--purple)' },
    { id: 'certs',       label: 'CERTS',      color: 'var(--red)' },
    { id: 'education',   label: 'EDUCATION',  color: '#e83e8c' },
    { id: 'contact',     label: 'CONTACT',    color: 'var(--text-bright)' }
  ];

  function setView(id) {
    activeSection.value = id;
    playPing();
    window.scrollTo(0, 0); // Ensure we are at the top when switching views
  }
</script>

<nav class="topnav" aria-label="Main Navigation">
  <div class="topnav__scroll-container">
    {#each navItems as item}
      <button
        class="topnav__btn"
        class:topnav__btn--active={activeSection.value === item.id}
        onclick={() => setView(item.id)}
        aria-label={item.label}
        style="--nav-color: {item.color};"
      >
        <div class="topnav__btn-bg"></div>
        <div class="topnav__btn-scanline"></div>
        <span class="topnav__btn-bracket topnav__btn-bracket--left">[</span>
        <span class="btn-text">{item.label}</span>
        <span class="topnav__btn-bracket topnav__btn-bracket--right">]</span>
        {#if activeSection.value === item.id}
          <div class="active-indicator"></div>
          <div class="active-indicator active-indicator--top"></div>
        {/if}
      </button>
    {/each}
  </div>
</nav>

<style>
  .topnav {
    position: fixed;
    top: var(--topbar-height);
    left: 0;
    right: 0;
    height: 50px;
    background: rgba(4, 7, 16, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px dashed var(--border-active);
    z-index: 99;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
  }

  .topnav__scroll-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    width: 100%;
    height: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0 var(--space-4);
  }
  
  .topnav__scroll-container::-webkit-scrollbar {
    display: none;
  }

  .topnav__btn {
    position: relative;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    height: 34px;
    padding: 0 var(--space-3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    border-radius: 4px;
  }

  .topnav__btn-bg {
    position: absolute;
    inset: 0;
    background: var(--nav-color);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  .topnav__btn-scanline {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transform: skewX(-20deg);
    z-index: 1;
    opacity: 0;
  }

  .btn-text {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .topnav__btn-bracket {
    position: relative;
    z-index: 2;
    opacity: 0;
    color: var(--nav-color);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-weight: bold;
  }

  .topnav__btn-bracket--left {
    transform: translateX(10px);
    margin-right: 4px;
  }

  .topnav__btn-bracket--right {
    transform: translateX(-10px);
    margin-left: 4px;
  }

  /* Hover State */
  .topnav__btn:hover {
    color: var(--text-bright);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }

  .topnav__btn:hover .topnav__btn-bg {
    opacity: 0.05;
  }

  .topnav__btn:hover .topnav__btn-bracket {
    opacity: 0.5;
    transform: translateX(0);
  }

  /* Active State */
  .topnav__btn--active {
    color: var(--text-bright);
    font-weight: bold;
    text-shadow: 0 0 10px var(--nav-color);
  }

  .topnav__btn--active .topnav__btn-bg {
    opacity: 0.15;
    animation: pulseBg 2s infinite alternate;
  }

  .topnav__btn--active .topnav__btn-bracket {
    opacity: 1;
    transform: translateX(0);
    text-shadow: 0 0 12px var(--nav-color);
  }

  .topnav__btn--active .topnav__btn-scanline {
    opacity: 1;
    animation: scanline 2.5s infinite linear;
  }

  /* Targeted Indicators */
  .active-indicator {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--nav-color);
    box-shadow: 0 0 10px var(--nav-color);
    animation: expandLine 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    z-index: 2;
  }

  .active-indicator::before,
  .active-indicator::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--text-bright);
    box-shadow: 0 0 8px var(--text-bright);
  }

  .active-indicator::before { left: 0; }
  .active-indicator::after { right: 0; }

  .active-indicator { bottom: 0; }
  .active-indicator--top { top: 0; }

  /* Animations */
  @keyframes scanline {
    0% { left: -100%; }
    20% { left: 200%; }
    100% { left: 200%; }
  }

  @keyframes pulseBg {
    from { opacity: 0.1; }
    to { opacity: 0.25; }
  }

  @keyframes expandLine {
    0% { width: 0; left: 50%; opacity: 0; }
    50% { opacity: 1; }
    100% { width: 100%; left: 0; opacity: 1; }
  }

  @media (max-width: 1024px) {
    .topnav__scroll-container {
      justify-content: flex-start;
    }
  }

  @media (max-width: 768px) {
    .topnav {
      display: none;
    }
  }
</style>
