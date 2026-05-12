<script>
  import { getUptime, executiveMode } from '$lib/stores.svelte.js';

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

  // ── UPGRADE 08: scrolling telemetry ticker ──
  // Real metrics — GitHub stats sourced from github.com/sruthik27 + LinkedIn.
  // Update LATEST_PUSH on each rebuild when shipping a new repo.
  const tickerItems = $derived([
    { label: 'UPTIME',      val: uptime.formatted,                     tone: 'val' },
    { label: 'NODE',        val: 'Chennai · IN',                       tone: '' },
    { label: 'ROLE',        val: 'Cloud & Network Eng @ HPE',          tone: 'val' },
    { label: 'CERTS',       val: '33 ACTIVE',                          tone: 'green' },
    { label: 'BUILD',       val: 'PASSING',                            tone: 'green' },
    { label: 'GH_REPOS',    val: '18 PUBLIC · sruthik27',              tone: 'val' },
    { label: 'STACK',       val: 'Go · React · Quarkus · K8s',         tone: '' },
    { label: 'CLOUD',       val: 'AWS · AZURE · K8S',                  tone: 'val' },
    { label: 'DEPLOY',      val: '15 SYSTEMS LIVE',                    tone: 'green' },
    { label: 'GH_SINCE',    val: 'JUL 2019 · ~7 YEARS',                tone: '' },
    { label: 'LATEST_PUSH', val: 'marginalia-desktop · MAY 2026',      tone: 'val' }
  ]);
</script>

<header class="topbar">
  <div class="topbar__left">
    <span class="topbar__logo">SRUTHIK.ISSAC</span>
    <span class="topbar__separator">|</span>
    <span class="topbar__status">
      <span class="pulse-dot"></span>
      <span>ONLINE</span>
    </span>
  </div>

  <div class="topbar__ticker" aria-hidden="true">
    <span class="ticker__label">SYS TELEMETRY</span>
    <div class="ticker__track">
      <div class="ticker__inner">
        {#each [0, 1] as _loop}
          {#each tickerItems as item}
            <span class="ticker__item">
              <span class="ticker__item-label">{item.label}</span>
              <span class="ticker__item-val {item.tone}">{item.val}</span>
            </span>
            <span class="ticker__sep">//</span>
          {/each}
        {/each}
      </div>
    </div>
  </div>

  <div class="topbar__right">
    <a
      class="topbar-action"
      href="/resume?print=1"
      target="_blank"
      rel="noopener"
      title="Export resume as PDF"
      aria-label="Export resume as PDF"
    >
      [↓ EXPORT RESUME]
    </a>
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
    gap: 16px;
  }

  .topbar__left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
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

  /* ── Ticker ── */
  .topbar__ticker {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
    padding: 0 12px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    overflow: hidden;
  }

  .ticker__label {
    font-size: 0.62rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
    white-space: nowrap;
    padding-right: 12px;
    border-right: 1px solid var(--border);
    flex-shrink: 0;
  }

  .ticker__track {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    position: relative;
    mask-image: linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%);
  }

  .ticker__inner {
    display: flex;
    gap: 24px;
    white-space: nowrap;
    animation: tickerScroll 48s linear infinite;
    align-items: center;
    width: max-content;
  }

  .topbar__ticker:hover .ticker__inner {
    animation-play-state: paused;
  }

  @keyframes tickerScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .ticker__item {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    flex-shrink: 0;
  }

  .ticker__item-label {
    color: var(--text-dim);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
  }

  .ticker__item-val {
    color: var(--text-secondary);
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
  }

  .ticker__item-val.val { color: var(--cyan); }
  .ticker__item-val.green { color: var(--green); }
  .ticker__item-val.amber { color: var(--amber); }

  .ticker__sep {
    color: var(--text-dim);
    opacity: 0.35;
    flex-shrink: 0;
  }

  .topbar__clock {
    font-family: var(--font-mono);
    font-size: var(--text-topbar);
    color: var(--amber);
    font-weight: 500;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }

  /* Executive Toggle + Export Resume — shared chrome button styling */
  .executive-toggle,
  .topbar-action {
    background: transparent;
    border: 1px solid var(--border-subtle);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: var(--space-1) var(--space-2);
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    text-decoration: none;
    white-space: nowrap;
    line-height: 1;
  }

  .executive-toggle:hover,
  .topbar-action:hover {
    color: var(--text-primary);
    border-color: var(--border-active);
  }

  .topbar-action {
    color: var(--green);
    border-color: rgba(0, 255, 136, 0.3);
  }

  .topbar-action:hover {
    color: var(--text-bright);
    border-color: var(--green);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.25);
  }

  .executive-toggle.active {
    background: var(--text-primary);
    color: var(--void);
    border-color: var(--text-primary);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  @media (prefers-reduced-motion: reduce) {
    .ticker__inner { animation: none; }
  }

  @media (max-width: 1100px) {
    .ticker__label { display: none; }
  }

  @media (max-width: 900px) {
    .topbar__ticker { display: none; }
    .executive-toggle { display: none; }
  }

  @media (max-width: 1100px) {
    .topbar-action {
      font-size: 0.7rem;
      padding: var(--space-1);
    }
  }

  @media (max-width: 640px) {
    .topbar-action {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .topbar {
      gap: 8px;
    }
  }
</style>
