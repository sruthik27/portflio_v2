<script>
  import { activeSection, isCommandPaletteOpen, executiveMode } from '$lib/stores.svelte.js';
  import { onMount } from 'svelte';
  import { playPing } from '$lib/utils/audio.js';

  let inputEl = $state();
  let query = $state('');
  
  // Available commands
  const commands = [
    { id: 'hero', label: 'Go to Hero / Status', action: () => navigateTo('hero'), icon: '⌂' },
    { id: 'about', label: 'Open System Overview', action: () => navigateTo('about'), icon: '◉' },
    { id: 'domains', label: 'View Domain Architecture', action: () => navigateTo('domains'), icon: '⬡' },
    { id: 'experience', label: 'View Experience', action: () => navigateTo('experience'), icon: '≡' },
    { id: 'projects', label: 'View Projects', action: () => navigateTo('projects'), icon: '⊞' },
    { id: 'certs', label: 'View Certifications', action: () => navigateTo('certs'), icon: '◈' },
    { id: 'education', label: 'View Education', action: () => navigateTo('education'), icon: '◌' },
    { id: 'contact', label: 'Open Contact View', action: () => navigateTo('contact'), icon: '⇝' },
    { 
      id: 'toggle-executive', 
      label: 'Toggle Executive Mode', 
      action: () => { executiveMode.value = !executiveMode.value; close(); }, 
      icon: '◑' 
    },
    { 
      id: 'download-pdf', 
      label: 'Print / Download PDF Resume', 
      action: () => { window.print(); close(); }, 
      icon: '↓' 
    },
    {
      id: 'sudo-hire-me',
      label: 'sudo hire-me',
      action: () => { 
        window.location.href = 'mailto:sruthikissac2016@gmail.com?subject=Offer%20Letter%3A%20Sruthik%20Issac';
        close();
      },
      icon: '★'
    }
  ];

  let filteredCommands = $derived(
    query.trim() === '' 
      ? commands 
      : commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.id.includes(query.toLowerCase()))
  );

  let selectedIndex = $state(0);

  $effect(() => {
    // Reset selection when query changes
    query; 
    selectedIndex = 0;
  });

  $effect(() => {
    if (isCommandPaletteOpen.value && inputEl) {
      // Focus on next tick to allow DOM to render
      setTimeout(() => inputEl.focus(), 10);
      playPing(); // tiny blip when opening
    } else {
      query = '';
    }
  });

  onMount(() => {
    const handleGlobalKeydown = (e) => {
      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isCommandPaletteOpen.value = !isCommandPaletteOpen.value;
      }
      
      if (!isCommandPaletteOpen.value) return;
      if (filteredCommands.length === 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
        e.preventDefault();
        return;
      }

      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + filteredCommands.length) % filteredCommands.length;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeydown);
    return () => window.removeEventListener('keydown', handleGlobalKeydown);
  });

  function close() {
    isCommandPaletteOpen.value = false;
  }

  function navigateTo(id) {
    close();
    activeSection.value = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

{#if isCommandPaletteOpen.value}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="palette-overlay" onclick={close}>
    <div class="palette-modal panel" onclick={(e) => e.stopPropagation()}>
      <div class="palette-header">
        <span class="prompt-symbol">❯</span>
        <input 
          bind:this={inputEl}
          bind:value={query}
          class="palette-input"
          placeholder="Type a command or search..."
          type="text"
          autocomplete="off"
          spellcheck="false"
        />
        <span class="shortcut-hint">ESC to close</span>
      </div>

      <ul class="command-list">
        {#each filteredCommands as cmd, i}
          <li>
            <button
              type="button"
              class="command-btn {i === selectedIndex ? 'selected' : ''}"
              onclick={() => cmd.action()}
              onmouseenter={() => selectedIndex = i}
            >
              <span class="cmd-icon">{cmd.icon}</span>
              <span class="cmd-label">{cmd.label}</span>
              {#if i === selectedIndex}
                <span class="cmd-enter">↵</span>
              {/if}
            </button>
          </li>
        {:else}
          <li class="no-results text-muted">No commands found matching "{query}"</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .palette-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(4, 7, 16, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    padding-top: 15vh;
  }

  .palette-modal {
    width: 90%;
    max-width: 600px;
    background: var(--panel-raised);
    border: 1px solid var(--border-active);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    max-height: 400px;
    animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .palette-header {
    display: flex;
    align-items: center;
    padding: var(--space-4);
    border-bottom: 1px solid var(--border);
    gap: var(--space-3);
  }

  .prompt-symbol {
    color: var(--cyan);
    font-weight: bold;
    font-size: 1.2rem;
  }

  .palette-input {
    flex-grow: 1;
    background: transparent;
    border: none;
    color: var(--text-bright);
    font-family: var(--font-mono);
    font-size: 1.1rem;
    outline: none;
  }

  .palette-input::placeholder {
    color: var(--text-muted);
  }

  .shortcut-hint {
    font-size: var(--text-micro);
    color: var(--text-dim);
    border: 1px solid var(--border-subtle);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .command-list {
    list-style: none;
    overflow-y: auto;
    padding: var(--space-2);
  }

  .command-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    text-align: left;
    cursor: pointer;
    border-left: 2px solid transparent;
  }

  .command-btn.selected {
    background: var(--panel-inset);
    color: var(--text-primary);
    border-left-color: var(--cyan);
  }

  .cmd-icon {
    color: var(--text-dim);
    width: 20px;
    text-align: center;
  }

  .command-btn.selected .cmd-icon {
    color: var(--cyan);
  }

  .cmd-enter {
    margin-left: auto;
    color: var(--text-muted);
  }

  .no-results {
    padding: var(--space-4);
    text-align: center;
    font-size: 0.9rem;
  }
</style>
