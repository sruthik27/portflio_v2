<script>
  import { activeSection } from '$lib/stores.svelte.js';
  import { playPing } from '$lib/utils/audio.js';

  const navItems = [
    { id: 'hero',        icon: '⌂', label: 'STATUS' },
    { id: 'about',       icon: '◉', label: 'ABOUT' },
    { id: 'domains',     icon: '⬡', label: 'DOMAINS' },
    { id: 'experience',  icon: '≡', label: 'EXP' },
    { id: 'projects',    icon: '⊞', label: 'WORK' },
    { id: 'certs',       icon: '◈', label: 'CERTS' },
    { id: 'education',   icon: '◌', label: 'EDU' },
    { id: 'contact',     icon: '⇝', label: 'CONTACT' }
  ];

  function navigateTo(id) {
    playPing();
    activeSection.value = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<nav class="mobile-nav" aria-label="Mobile Navigation">
  <div class="nav-container">
    {#each navItems as item}
      <button 
        class="nav-item {activeSection.value === item.id ? 'active' : ''}"
        type="button"
        onclick={() => navigateTo(item.id)}
        aria-current={activeSection.value === item.id ? 'page' : undefined}
      >
        <span class="nav-icon">{item.icon}</span>
        <span class="nav-label">{item.label}</span>
      </button>
    {/each}
  </div>
</nav>

<style>
  .mobile-nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(4, 7, 16, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--border);
    z-index: 100;
  }

  .nav-container {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    overflow-x: auto;
    scrollbar-width: none;
    padding: var(--space-2) var(--space-2) calc(var(--space-2) + env(safe-area-inset-bottom, 0px));
  }

  .nav-container::-webkit-scrollbar {
    display: none;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-muted);
    padding: var(--space-2);
    min-width: 68px;
    gap: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .nav-item.active {
    color: var(--cyan);
  }

  .nav-icon {
    font-size: 1.2rem;
  }

  .nav-label {
    font-size: 0.6rem;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    .mobile-nav {
      display: block;
    }
  }
</style>
