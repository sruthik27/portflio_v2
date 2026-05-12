<script>
  import { getUptime } from '$lib/stores.svelte.js';
  import { tourActive } from '$lib/stores.svelte.js';
  import { startThruster, stopThruster } from '$lib/utils/audio.js';
  import { reveal } from '$lib/actions/scroll.js';
  import { onMount } from 'svelte';

  let now = $state(new Date());
  let nameEl = $state(null);
  let glitchInterval = null;

  const GLITCH_CHARS = '01!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZ_<>/\\|{}[]';
  const FINAL_NAME = 'SRUTHIK ISSAC';

  $effect(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);
    return () => clearInterval(interval);
  });

  function stopGlitchDecode() {
    if (glitchInterval) {
      clearInterval(glitchInterval);
      glitchInterval = null;
    }
  }

  // ── Glitch Decode Effect ──
  function runGlitchDecode() {
    if (!nameEl) return;
    stopGlitchDecode();
    const letters = FINAL_NAME.split('');
    const resolved = new Array(letters.length).fill(false);
    let iteration = 0;

    glitchInterval = setInterval(() => {
      if (!nameEl || !nameEl.isConnected) {
        stopGlitchDecode();
        return;
      }

      nameEl.innerText = letters.map((char, i) => {
        if (resolved[i] || char === ' ') return char;
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }).join('');

      // Resolve 1-2 characters per tick, left to right
      const unresolved = resolved.map((r, i) => r ? -1 : i).filter(i => i >= 0 && letters[i] !== ' ');
      if (unresolved.length > 0) {
        const resolveCount = Math.min(1 + Math.floor(iteration / 3), unresolved.length);
        for (let r = 0; r < resolveCount; r++) {
          resolved[unresolved[r]] = true;
        }
      }

      iteration++;
      if (resolved.every(Boolean)) {
        stopGlitchDecode();
        nameEl.innerText = FINAL_NAME;
        nameEl.classList.add('decoded');
      }
    }, 60);
  }

  onMount(() => {
    // ── Glitch decode on load ──
    runGlitchDecode();
    return () => {
      stopGlitchDecode();
    };
  });

  const uptime = $derived(getUptime(now));

  const badges = [
    { label: '◈ BUILDING AI-POWERED APPLICATIONS', theme: 'cyan' },
    { label: '● ENGINEERING CLOUD FOR NETWORKS', theme: 'green' },
    { label: '⚑ DESIGNING SCALABLE ARCHITECTURES', theme: 'amber' },
    { label: '◈ EXPLORING EMERGING TECH', theme: 'purple' },
  ];

  const currentlyItems = [
    { icon: '⚙', label: 'BUILDING', detail: 'AI-powered network troubleshooting for self-driving networks', color: 'green' },
    { icon: '☁', label: 'SHIPPING', detail: 'Cloud-based diagnostic tools for Aruba New Central', color: 'cyan' },
    { icon: '🧠', label: 'CRAFTING', detail: 'RAG pipelines, LangGraph agents, MCP servers & n8n workflows', color: 'purple' },
    { icon: '⚡', label: 'EXPLORING', detail: 'Vibe coding, LLM-powered automation & Infrastructure as Code', color: 'amber' },
  ];

  const stats = [
    { label: 'EXPERIENCE', value: '2+ YEARS' },
    { label: 'CERTIFICATIONS', value: '33 ACTIVE' },
    { label: 'PROJECTS SHIPPED', value: '15 SYSTEMS' },
    { label: 'COFFEE CONSUMED', value: '9,001 ☕️' },
  ];
</script>

<section id="hero" class="hero" aria-label="System Status Overview">
  <div class="hero__grid">
    <!-- LEFT COLUMN -->
    <div class="hero__left" use:reveal={{ delay: 100 }}>
      <div class="hero__eyebrow">
        PROUD CLOUD & NETWORK ENGINEER
      </div>

      <h1 class="hero__name" bind:this={nameEl} data-text={FINAL_NAME} aria-label={FINAL_NAME}>SRUTHIK ISSAC</h1>

      <div class="hero__role">
        CLOUD & NETWORK ENGINEER @ HPE NETWORKING · AWS SAA · CCNA
      </div>

      <div class="hero__badges">
        {#each badges as badge}
          <span class="status-badge status-badge--{badge.theme}">
            {badge.label}
          </span>
        {/each}
      </div>

      <div class="hero__stats">
        {#each stats as stat}
          <div class="hero__stat">
            <div class="hero__stat-label">{stat.label}</div>
            <div class="hero__stat-value" class:hero__stat-value--live={stat.dynamic}>
              {#if stat.dynamic}
                {uptime.fullFormatted}
              {:else}
                {stat.value}
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <!-- Sleeping Bot Tour Trigger -->
      {#if !tourActive.value}
      <button
        class="hero__sleeping-bot"
        onclick={() => { stopThruster(); tourActive.value = true; }}
        onmouseenter={startThruster}
        onmouseleave={stopThruster}
        aria-label="Start Guided Tour"
      >
        <div class="sleeping-bot__body">
          <div class="sleeping-bot__antenna">
            <div class="sleeping-bot__antenna-ring"></div>
            <div class="sleeping-bot__antenna-tip"></div>
            <div class="sleeping-bot__antenna-stem"></div>
          </div>
          <div class="sleeping-bot__head">
            <div class="sleeping-bot__ear sleeping-bot__ear--left"></div>
            <div class="sleeping-bot__ear sleeping-bot__ear--right"></div>
            <div class="sleeping-bot__visor">
              <div class="sleeping-bot__visor-glass"></div>
              <div class="sleeping-bot__eyes">
                <div class="sleeping-bot__eye sleeping-bot__eye--left"></div>
                <div class="sleeping-bot__eye sleeping-bot__eye--right"></div>
              </div>
              <div class="sleeping-bot__mouth"></div>
            </div>
          </div>
          <div class="sleeping-bot__chassis">
             <div class="sleeping-bot__core"></div>
          </div>
          <div class="sleeping-bot__thruster">
             <div class="sleeping-bot__flame"></div>
          </div>
          <div class="sleeping-bot__zzz">
            <span>z</span><span>z</span><span>z</span>
          </div>
          <div class="sleeping-bot__glow"></div>
        </div>
        <div class="sleeping-bot__caption">wake me up for a tour</div>
      </button>
      {/if}
    </div>

    <!-- RIGHT COLUMN -->
    <div class="hero__right">
      <div class="panel panel--cyan hero__uptime-panel" use:reveal={{ delay: 300 }}>
        <div class="hero__uptime-title">▲ CAREER UPTIME</div>
        <div class="hero__uptime-date">SINCE: FEB 1, 2024</div>
        <div class="hero__uptime-counter">
          {uptime.years} YEARS · {uptime.months} MONTHS · {uptime.days} DAYS
        </div>
        <div class="hero__uptime-clock">
          {String(uptime.hours).padStart(2, '0')}:{String(uptime.minutes).padStart(2, '0')}:{String(uptime.seconds).padStart(2, '0')}
        </div>
      </div>

      <div class="panel panel--purple hero__currently-panel" use:reveal={{ delay: 400 }}>
        <div class="hero__currently-title">▸ ACTIVE THREADS</div>
        {#each currentlyItems as item}
          <div class="hero__currently-row">
            <span class="hero__currently-icon" style="color: var(--{item.color})">{item.icon}</span>
            <div class="hero__currently-content">
              <span class="hero__currently-label" style="color: var(--{item.color})">{item.label}</span>
              <span class="hero__currently-detail">{item.detail}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: calc(var(--topbar-height) + var(--space-7));
    padding-bottom: var(--space-10);
    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 70%);
  }

  .hero__grid {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: max(32px, 4vw);
    width: 100%;
  }

  /* ── Left column ── */
  .hero__eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    color: var(--text-dim);
    letter-spacing: 0.1em;
    margin-bottom: var(--space-3);
  }

  .hero__name {
    font-family: var(--font-name);
    font-weight: 700;
    font-size: var(--text-hero);
    color: var(--text-bright);
    line-height: 1.1;
    letter-spacing: 0.04em;
    margin-bottom: var(--space-3);
    position: relative;
    display: inline-block;
    cursor: default;
  }

  /* ── Chromatic aberration layers (UPGRADE 01) ── */
  /* The ghost channels read from the static `data-text` attribute, so they
     stay correct even while nameEl.innerText is being scrambled during the
     decode. They only paint on :hover, so there's no visual cost pre-decode. */
  .hero__name::before,
  .hero__name::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 0.12s var(--ease);
    font: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    white-space: pre;
  }
  .hero__name::before { color: #ff3366; }
  .hero__name::after  { color: #00d4ff; }

  .hero__name:hover::before {
    opacity: 1;
    animation: chroma-r 0.6s steps(1) infinite;
  }
  .hero__name:hover::after {
    opacity: 1;
    animation: chroma-b 0.6s steps(1) infinite 0.03s;
  }

  @keyframes chroma-r {
    0%   { clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%); transform: translate(-4px); }
    15%  { clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%); transform: translate(3px); }
    30%  { clip-path: polygon(0 40%, 100% 40%, 100% 55%, 0 55%); transform: translate(-3px); }
    50%  { clip-path: polygon(0 80%, 100% 80%, 100% 95%, 0 95%); transform: translate(4px); }
    70%  { clip-path: polygon(0 5%,  100% 5%,  100% 20%, 0 20%); transform: translate(-2px); }
    100% { clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%); transform: translate(-4px); }
  }
  @keyframes chroma-b {
    0%   { clip-path: polygon(0 70%, 100% 70%, 100% 85%, 0 85%);  transform: translate(4px); }
    20%  { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);  transform: translate(-3px); }
    45%  { clip-path: polygon(0 50%, 100% 50%, 100% 65%, 0 65%);  transform: translate(3px); }
    65%  { clip-path: polygon(0 5%,  100% 5%,  100% 18%, 0 18%);  transform: translate(-4px); }
    85%  { clip-path: polygon(0 85%, 100% 85%, 100% 100%, 0 100%);transform: translate(2px); }
    100% { clip-path: polygon(0 70%, 100% 70%, 100% 85%, 0 85%);  transform: translate(4px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__name:hover::before,
    .hero__name:hover::after {
      animation: none;
      opacity: 0;
    }
  }

  .hero__role {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    color: var(--text-secondary);
    letter-spacing: 0.04em;
    margin-bottom: var(--space-6);
  }

  .hero__badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
  }

  .hero__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .hero__stat {
    padding: var(--space-3) 0;
    border-top: 1px solid var(--border-subtle);
  }

  .hero__stat-label {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    color: var(--text-muted);
    letter-spacing: 0.06em;
    margin-bottom: var(--space-1);
  }

  .hero__stat-value {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.82rem;
    color: var(--text-bright);
  }

  .hero__stat-value--live {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--text-body);
    font-variant-numeric: tabular-nums;
  }



  /* ── Sleeping Bot Trigger ── */
  .hero__sleeping-bot {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 16px 20px;
    background: var(--panel-inset);
    border: 1px solid rgba(0, 212, 255, 0.12);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .hero__sleeping-bot:hover {
    border-color: rgba(0, 212, 255, 0.4);
    background: rgba(0, 212, 255, 0.03);
    box-shadow: 0 0 25px rgba(0, 212, 255, 0.08);
  }

  .sleeping-bot__body {
    position: relative;
    width: 64px;
    height: 80px;
    flex-shrink: 0;
    animation: sleepBob 4s ease-in-out infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  @keyframes sleepBob {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-4px) rotate(3deg); }
  }

  .sleeping-bot__antenna {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    margin-bottom: -2px;
  }

  .sleeping-bot__antenna-tip {
    width: 8px;
    height: 8px;
    background: var(--text-muted);
    border-radius: 50%;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }

  .hero__sleeping-bot:hover .sleeping-bot__antenna-tip {
    background: var(--green);
    box-shadow: 0 0 10px var(--green), 0 0 20px var(--green);
  }

  .sleeping-bot__antenna-ring {
    position: absolute;
    top: 3px;
    width: 14px;
    height: 4px;
    border: 1px solid var(--text-muted);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__antenna-ring {
    border-color: var(--green);
    animation: ringPulseSleep 2s ease-in-out infinite;
  }

  @keyframes ringPulseSleep {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.5); opacity: 0; }
  }

  .sleeping-bot__antenna-stem {
    width: 2px;
    height: 12px;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__antenna-stem {
    background: linear-gradient(to bottom, var(--cyan), #1a2c4b);
  }

  .sleeping-bot__head {
    width: 60px;
    height: 48px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 20px 20px 14px 14px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow:
      inset 0 2px 4px rgba(255, 255, 255, 0.1),
      inset 0 -4px 8px rgba(0, 0, 0, 0.6),
      0 4px 12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 2px solid #080f1e;
    z-index: 5;
    transition: border-color 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__head {
    border-color: rgba(0, 212, 255, 0.3);
  }

  .sleeping-bot__ear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 20px;
    background: #334155;
    border-radius: 4px;
    box-shadow: inset 0 0 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.05);
    transition: border-color 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__ear {
    border-color: rgba(0, 212, 255, 0.2);
  }

  .sleeping-bot__ear--left {
    left: -4px;
    border-radius: 6px 2px 2px 6px;
  }

  .sleeping-bot__ear--right {
    right: -4px;
    border-radius: 2px 6px 6px 2px;
  }

  .sleeping-bot__visor {
    width: 46px;
    height: 26px;
    background: #020617;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 
      inset 0 0 12px rgba(0, 0, 0, 0.5),
      0 1px 2px rgba(255,255,255,0.1);
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin-top: 2px;
    transition: all 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__visor {
    box-shadow: 
      inset 0 0 12px rgba(0, 212, 255, 0.15),
      0 1px 2px rgba(255,255,255,0.1);
    border-color: rgba(0, 212, 255, 0.2);
  }

  .sleeping-bot__visor-glass {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    border-radius: 10px 10px 0 0;
    pointer-events: none;
  }

  .sleeping-bot__eyes {
    display: flex;
    gap: 12px;
    margin-bottom: 4px;
    z-index: 2;
  }

  /* Sleeping: eyes are flat lines */
  .sleeping-bot__eye {
    width: 10px;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* On hover: eyes open! */
  .hero__sleeping-bot:hover .sleeping-bot__eye {
    height: 10px;
    background: var(--cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan);
  }

  .hero__sleeping-bot:hover .sleeping-bot__eye--right {
    animation: eyeBlinkSleep 4s ease-in-out infinite 0.1s;
  }
  .hero__sleeping-bot:hover .sleeping-bot__eye--left {
    animation: eyeBlinkSleep 4s ease-in-out infinite;
  }

  @keyframes eyeBlinkSleep {
    0%, 42%, 48%, 100% { transform: scaleY(1); }
    45% { transform: scaleY(0.1); }
  }

  .sleeping-bot__mouth {
    width: 14px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin-top: 2px;
    opacity: 0.5;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .hero__sleeping-bot:hover .sleeping-bot__mouth {
    opacity: 0.8;
    background: var(--green);
    box-shadow: 0 0 8px var(--green);
    width: 12px;
    height: 6px;
    border-radius: 6px;
  }

  .sleeping-bot__chassis {
    width: 34px;
    height: 16px;
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    border-radius: 0 0 12px 12px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 
      inset 0 0 6px rgba(0,0,0,0.8),
      0 4px 8px rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-top: none;
    z-index: 4;
  }

  .sleeping-bot__core {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__core {
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan);
    animation: corePulseSleep 2s infinite alternate;
  }

  @keyframes corePulseSleep {
    0% { opacity: 0.6; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 12px var(--cyan); }
  }

  .sleeping-bot__thruster {
    width: 16px;
    height: 8px;
    background: #0f172a;
    border-radius: 0 0 8px 8px;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
  }

  .sleeping-bot__flame {
    width: 8px;
    height: 6px;
    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
    border-radius: 10px;
    opacity: 0.5;
    transform-origin: top;
    transition: all 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__flame {
    width: 10px;
    height: 20px;
    background: linear-gradient(180deg, var(--cyan) 0%, transparent 100%);
    opacity: 0.8;
    animation: thrusterFlickerSleep 0.1s infinite;
  }

  @keyframes thrusterFlickerSleep {
    0% { transform: scaleY(1); opacity: 0.8; }
    50% { transform: scaleY(1.2); opacity: 1; }
    100% { transform: scaleY(0.9); opacity: 0.9; }
  }

  .sleeping-bot__glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__glow {
    background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%);
  }

  /* Floating zzz */
  .sleeping-bot__zzz {
    position: absolute;
    top: -12px;
    right: -20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: opacity 0.3s ease;
    z-index: 20;
  }

  .hero__sleeping-bot:hover .sleeping-bot__zzz {
    opacity: 0;
  }

  .sleeping-bot__zzz span {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-muted);
    opacity: 0;
    animation: zzzFloat 3s ease-in-out infinite;
  }

  .sleeping-bot__zzz span:nth-child(1) { animation-delay: 0s; font-size: 0.5rem; }
  .sleeping-bot__zzz span:nth-child(2) { animation-delay: 0.4s; font-size: 0.6rem; transform: translateX(6px) translateY(-2px); }
  .sleeping-bot__zzz span:nth-child(3) { animation-delay: 0.8s; font-size: 0.7rem; transform: translateX(12px) translateY(-4px); }

  @keyframes zzzFloat {
    0%, 100% { opacity: 0; transform: translateY(0); }
    30%, 70% { opacity: 0.6; }
    50% { opacity: 0.8; transform: translateY(-8px); }
  }

  .sleeping-bot__caption {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
    letter-spacing: 0.06em;
    transition: color 0.3s ease;
  }

  .hero__sleeping-bot:hover .sleeping-bot__caption {
    color: var(--cyan);
  }

  /* ── Right column ── */
  .hero__right {
    display: flex;
    flex-direction: column;
    gap: var(--panel-gap);
  }

  .hero__uptime-panel {
    text-align: center;
    padding: var(--space-6);
  }

  .hero__uptime-title {
    font-family: var(--font-display);
    font-size: var(--text-panel-title);
    font-weight: 600;
    color: var(--cyan);
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
  }

  .hero__uptime-date {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    color: var(--text-dim);
    letter-spacing: 0.06em;
    margin-bottom: var(--space-4);
  }

  .hero__uptime-counter {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-bright);
    letter-spacing: 0.06em;
    margin-bottom: var(--space-2);
  }

  .hero__uptime-clock {
    font-family: var(--font-mono);
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--green);
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 20px var(--green);
  }

  .hero__currently-panel {
    flex: 1;
    overflow: hidden;
  }

  .hero__currently-title {
    font-family: var(--font-display);
    font-size: var(--text-panel-title);
    font-weight: 600;
    color: var(--purple);
    letter-spacing: 0.1em;
    margin-bottom: var(--space-4);
  }

  .hero__currently-row {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: 8px 0;
    border-bottom: 1px solid var(--border-subtle);
    transition: background var(--fast) var(--ease);
  }

  .hero__currently-row:hover {
    background: var(--panel-raised);
  }

  .hero__currently-row:last-child {
    border-bottom: none;
  }

  .hero__currently-icon {
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .hero__currently-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .hero__currently-label {
    font-family: var(--font-display);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
  }

  .hero__currently-detail {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--text-secondary);
    letter-spacing: 0.01em;
    line-height: 1.4;
  }

  /* ── Responsive ── */
  @media (max-width: 1200px) {
    .hero__grid {
      grid-template-columns: 1fr;
    }
    .hero__stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding-top: calc(var(--topbar-height) + var(--space-5));
      min-height: auto;
    }
    .hero__name {
      font-size: 2.2rem;
    }
    .hero__stats {
      grid-template-columns: repeat(2, 1fr);
    }
    .hero__badges {
      gap: var(--space-1);
    }
  }
</style>
