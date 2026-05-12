<script>
  import { onMount } from 'svelte';
  import { radarAxes } from '$lib/data/skills.js';

  const RADAR_CX = 100, RADAR_CY = 100, RADAR_R = 70;

  function pointAt(i, r, total) {
    const a = (Math.PI * 2 / total) * i - Math.PI / 2;
    return [RADAR_CX + r * Math.cos(a), RADAR_CY + r * Math.sin(a)];
  }

  const radarRings = [0.25, 0.5, 0.75, 1].map(f =>
    radarAxes.map((_, i) => pointAt(i, RADAR_R * f, radarAxes.length).join(',')).join(' ')
  );

  const radarSpokes = radarAxes.map((_, i) => pointAt(i, RADAR_R, radarAxes.length));

  const radarLabels = radarAxes.map((axis, i) => ({
    axis,
    point: pointAt(i, RADAR_R * 1.24, radarAxes.length)
  }));

  let radarProgress = $state(0);
  let radarWrap = $state(null);

  const radarPolyPoints = $derived(
    radarAxes.map((ax, i) => pointAt(i, RADAR_R * (ax.value / 100) * radarProgress, radarAxes.length).join(',')).join(' ')
  );
  const radarDots = $derived(
    radarAxes.map((ax, i) => {
      const [x, y] = pointAt(i, RADAR_R * (ax.value / 100) * radarProgress, radarAxes.length);
      return { x, y, color: ax.color };
    })
  );

  function animateRadar() {
    radarProgress = 0;
    const start = performance.now();
    const DURATION = 900;
    function step(now) {
      const t = Math.min((now - start) / DURATION, 1);
      radarProgress = 1 - Math.pow(1 - t, 3);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  onMount(() => {
    if (!radarWrap) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      radarProgress = 1;
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateRadar();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(radarWrap);
    return () => obs.disconnect();
  });
</script>

<div
  class="radar-inline"
  bind:this={radarWrap}
  onclick={animateRadar}
  onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && animateRadar()}
  role="button"
  tabindex="0"
  aria-label="Cluster coverage radar — click to re-animate"
>
  <div class="radar-title">CLUSTER COVERAGE</div>
  <svg class="radar-svg" viewBox="0 0 200 200" aria-hidden="true">
    {#each radarRings as ringPts}
      <polygon points={ringPts} fill="none" stroke="rgba(0,212,255,0.08)" stroke-width="1" />
    {/each}
    {#each radarSpokes as [sx, sy]}
      <line x1={RADAR_CX} y1={RADAR_CY} x2={sx} y2={sy} stroke="rgba(0,212,255,0.1)" stroke-width="1" />
    {/each}
    <polygon
      points={radarPolyPoints}
      fill="rgba(0,255,136,0.08)"
      stroke="rgba(0,255,136,0.7)"
      stroke-width="1.5"
    />
    {#each radarDots as dot}
      <circle cx={dot.x} cy={dot.y} r="3" fill={dot.color} style="filter: drop-shadow(0 0 4px {dot.color});" />
    {/each}
    {#each radarLabels as { axis, point }}
      <text
        x={point[0]}
        y={point[1]}
        text-anchor="middle"
        dominant-baseline="middle"
        fill="rgba(138,176,204,0.9)"
        font-size="9"
        font-family="JetBrains Mono, monospace"
        letter-spacing="1"
      >{axis.label}</text>
    {/each}
  </svg>
  <div class="radar-values">
    {#each radarAxes as ax}
      <div class="radar-value-row">
        <span class="radar-dot" style="background: {ax.color}; box-shadow: 0 0 6px {ax.color};"></span>
        <span class="radar-label">{ax.label}</span>
        <span class="radar-value">{ax.value}%</span>
      </div>
    {/each}
  </div>
  <div class="radar-hint">▸ CLICK TO RE-SCAN</div>
</div>

<style>
  .radar-inline {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
    padding: var(--space-3);
    border: 1px dashed var(--border-subtle);
    border-radius: 4px;
    background: rgba(0, 212, 255, 0.02);
    transition: background var(--fast) var(--ease), border-color var(--fast) var(--ease);
  }

  .radar-inline:hover {
    background: rgba(0, 212, 255, 0.05);
    border-color: var(--cyan-border);
  }

  .radar-inline:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--cyan);
  }

  .radar-title {
    font-family: var(--font-mono);
    color: var(--cyan);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    align-self: flex-start;
  }

  .radar-svg {
    width: 200px;
    height: 200px;
    display: block;
  }

  .radar-values {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-secondary);
  }

  .radar-value-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .radar-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .radar-label {
    flex: 1;
    color: var(--text-primary);
    letter-spacing: 0.04em;
  }

  .radar-value {
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .radar-hint {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--text-dim);
    letter-spacing: 0.08em;
    align-self: flex-start;
    margin-top: var(--space-1);
  }
</style>
