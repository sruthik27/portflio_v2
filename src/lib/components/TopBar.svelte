<script>
  import { activeSection, getUptime, executiveMode } from '$lib/stores.svelte.js';

  let now = $state(new Date());

  $effect(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);
    return () => clearInterval(interval);
  });

  const uptime = $derived(getUptime(now));



  const clock = $derived(
    now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    }) + ' IST'
  );
</script>

<header class="topbar">
  <div class="topbar__left">
    <span class="topbar__logo">SRUTHIK.ISSAC</span>
    <span class="topbar__separator">|</span>
    <span class="topbar__status">
      <span class="pulse-dot"></span>
      <span>ONLINE</span>
    </span>
    <span class="topbar__separator">·</span>
    <span class="topbar__item">HPE: CLOUD ENGINEER</span>
    <span class="topbar__separator">·</span>
    <span class="topbar__item topbar__uptime">UPTIME: {uptime.formatted}</span>
    <span class="topbar__separator">·</span>
    <span class="topbar__item">CERTS: 34</span>
    <span class="topbar__separator">·</span>
    <span class="topbar__item">NODE: Chennai · IN</span>
  </div>

  <div class="topbar__right">

    <button 
      class="executive-toggle {executiveMode.value ? 'active' : ''}"
      onclick={() => executiveMode.value = !executiveMode.value}
      title="Toggle Light Theme (Print Friendly)"
    >
      [LIGHT MODE]
    </button>
    <span class="topbar__clock">{clock}</span>
  </div>
</header>

<style>
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--topbar-height);
    background: rgba(4, 7, 16, 0.97);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 16px;
    font-family: var(--font-mono);
    font-size: var(--text-topbar);
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--text-secondary);
  }

  .topbar__left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 1;
    overflow: hidden;
    min-width: 0;
  }

  .topbar__right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .topbar__logo {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.78rem;
    color: var(--cyan);
    letter-spacing: 0.1em;
    flex-shrink: 0;
  }

  .topbar__separator {
    color: var(--text-dim);
    flex-shrink: 0;
  }

  .topbar__status {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--green);
    font-weight: 500;
    flex-shrink: 0;
  }

  .topbar__item {
    color: var(--text-muted);
    white-space: nowrap;
  }

  .topbar__uptime {
    color: var(--text-secondary);
  }

  .topbar__clock {
    font-family: var(--font-mono);
    font-size: var(--text-topbar);
    color: var(--amber);
    font-weight: 500;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 1200px) {
    .topbar__item:not(.topbar__uptime) {
      display: none;
    }
  }

  /* Executive Toggle */
  .executive-toggle {
    background: transparent;
    border: 1px solid var(--border-subtle);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: var(--space-1) var(--space-2);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: var(--space-3);
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }

  .executive-toggle:hover {
    color: var(--text-primary);
    border-color: var(--border-active);
  }

  .executive-toggle.active {
    background: var(--text-primary);
    color: var(--void);
    border-color: var(--text-primary);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    .topbar__left {
      gap: 8px;
    }
    .topbar__item,
    .topbar__separator:nth-child(n+4) {
      display: none;
    }
  }
</style>
