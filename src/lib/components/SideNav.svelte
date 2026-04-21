<script>
  import { activeSection } from '$lib/stores.svelte.js';
  import { playPing } from '$lib/utils/audio.js';

  const navItems = [
    { id: 'hero',        icon: '⌂', label: 'STATUS',     group: 1 },
    { id: 'about',       icon: '◉', label: 'ABOUT',      group: 1 },
    { id: 'skills',      icon: '⬡', label: 'SKILLS',     group: 1 },
    { id: 'experience',  icon: '≡', label: 'EXPERIENCE', group: 2 },
    { id: 'projects',    icon: '⊞', label: 'PROJECTS',   group: 2 },
    { id: 'certs',       icon: '◈', label: 'CERTS',      group: 3 },
    { id: 'education',   icon: '◫', label: 'EDUCATION',  group: 3 },
    { id: 'syslog',      icon: '≣', label: 'SYSLOG',     group: 4 },
    { id: 'contact',     icon: '⇝', label: 'CONTACT',    group: 4 },
    { id: 'infra',       icon: '⛧', label: 'INFRA',      group: 5, special: true },
  ];

  /**
   * Group items by group number and insert dividers
   */
  function getGroupedItems() {
    const groups = [];
    let lastGroup = null;
    for (const item of navItems) {
      if (lastGroup !== null && item.group !== lastGroup) {
        groups.push({ type: 'divider' });
      }
      groups.push({ type: 'item', ...item });
      lastGroup = item.group;
    }
    return groups;
  }

  const groupedItems = getGroupedItems();

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  let hoveredItem = $state(null);
</script>

<nav class="sidenav" aria-label="Sections">
  <div class="sidenav__items">
    {#each groupedItems as entry}
      {#if entry.type === 'divider'}
        <div class="sidenav__divider"></div>
      {:else}
        <button
          class="sidenav__btn"
          class:sidenav__btn--active={activeSection.value === entry.id}
          class:sidenav__btn--special={entry.special}
          onclick={() => scrollToSection(entry.id)}
          onmouseenter={() => { hoveredItem = entry.id; playPing(); }}
          onmouseleave={() => hoveredItem = null}
          aria-label={entry.label}
          title={entry.label}
        >
          <span class="sidenav__icon">{entry.icon}</span>
          {#if hoveredItem === entry.id}
            <div class="sidenav__tooltip">
              {entry.label}{#if entry.special} · META{/if}
            </div>
          {/if}
        </button>
      {/if}
    {/each}
  </div>
</nav>

<style>
  .sidenav {
    position: fixed;
    top: var(--topbar-height);
    left: 0;
    bottom: 0;
    width: var(--sidenav-width);
    background: rgba(4, 7, 16, 0.97);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-right: 1px solid var(--border);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 12px;
  }

  .sidenav__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    width: 100%;
  }

  .sidenav__divider {
    width: 28px;
    height: 1px;
    background: var(--border-subtle);
    margin: 6px 0;
  }

  .sidenav__btn {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 0;
    cursor: pointer;
    color: var(--text-dim);
    font-size: 1rem;
    transition: all var(--fast) var(--ease);
    position: relative;
    clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%);
  }

  .sidenav__btn:hover,
  .sidenav__btn--active {
    color: var(--cyan);
    background: var(--cyan-glow);
    border-color: var(--cyan-border);
  }

  .sidenav__btn--special {
    color: var(--amber);
  }

  .sidenav__btn--special:hover,
  .sidenav__btn--special.sidenav__btn--active {
    color: var(--amber);
    background: var(--amber-glow);
    border-color: var(--amber-border);
  }

  .sidenav__icon {
    line-height: 1;
  }

  .sidenav__tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    background: var(--panel-raised);
    border: 1px solid var(--border-active);
    padding: 4px 10px;
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    color: var(--text-primary);
    white-space: nowrap;
    pointer-events: none;
    letter-spacing: 0.06em;
    z-index: 200;
  }

  @media (max-width: 768px) {
    .sidenav {
      display: none;
    }
  }
</style>
