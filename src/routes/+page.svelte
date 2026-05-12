<script>
  import { activeSection } from '$lib/stores.svelte.js';

  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import AboutSection from '$lib/components/sections/AboutSection.svelte';
  import DomainArchitectureSection from '$lib/components/sections/DomainArchitectureSection.svelte';
  import ExperienceSection from '$lib/components/sections/ExperienceSection.svelte';
  import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
  import CertificationsSection from '$lib/components/sections/CertificationsSection.svelte';
  import EducationSection from '$lib/components/sections/EducationSection.svelte';
  import ContactSection from '$lib/components/sections/ContactSection.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Lag the rendered section behind activeSection so the circuit-trace overlay
  // can fully cover the swap. activeSection updates the moment a nav button is
  // pressed; displayedSection updates at trace midpoint.
  let displayedSection = $state(activeSection.value);
  let canvasEl = $state(null);
  let sectionEl = $state(null);
  let transitioning = $state(false);

  function runCircuitTrace(target) {
    const canvas = canvasEl;
    if (!canvas) {
      displayedSection = target;
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      displayedSection = target;
      return;
    }

    transitioning = true;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const gridSize = 40;
    const gCols = Math.ceil(W / gridSize) + 1;
    const gRows = Math.ceil(H / gridSize) + 1;

    const numPaths = 22;
    const paths = [];
    for (let p = 0; p < numPaths; p++) {
      const pts = [];
      let x = Math.floor(Math.random() * gCols) * gridSize;
      let y = Math.floor(Math.random() * gRows) * gridSize;
      pts.push({ x, y });
      const steps = 5 + Math.floor(Math.random() * 10);
      for (let s = 0; s < steps; s++) {
        const dir = Math.floor(Math.random() * 4);
        const len = (1 + Math.floor(Math.random() * 4)) * gridSize;
        if (dir === 0) x = Math.min(W, x + len);
        else if (dir === 1) x = Math.max(0, x - len);
        else if (dir === 2) y = Math.min(H, y + len);
        else y = Math.max(0, y - len);
        pts.push({ x, y });
      }
      paths.push({
        pts,
        delay: Math.random() * 0.4,
        color: ['#00d4ff', '#00ff88', '#a855f7'][Math.floor(Math.random() * 3)],
        width: 0.8 + Math.random() * 0.8
      });
    }

    let switched = false;
    let globalP = 0;
    canvas.style.opacity = '1';

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    // Cross-fade the *section content only* — hex particle bg, TopBar, Footer
    // stay visible the whole time, so the circuit trace draws over the same
    // blue background instead of cutting to black void.
    function sectionCurve(p) {
      if (p < 0.4) return 1 - easeInOutCubic(p / 0.4);
      if (p < 0.55) return 0;
      if (p < 1.0) return easeInOutCubic((p - 0.55) / 0.45);
      return 1;
    }
    function trailCurve(p) {
      if (p < 0.55) return 1;
      if (p < 1.15) return 1 - easeInOutCubic((p - 0.55) / 0.6);
      return 0;
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      const trailAlpha = trailCurve(globalP);
      if (sectionEl) sectionEl.style.opacity = String(sectionCurve(globalP));

      ctx.globalAlpha = trailAlpha;
      paths.forEach(path => {
        const local = Math.max(0, (globalP - path.delay) / (1 - path.delay));
        if (local <= 0) return;

        const totalLen = path.pts.length - 1;
        const drawn = local * totalLen;
        const seg = Math.floor(drawn);
        const segP = drawn - seg;

        ctx.beginPath();
        ctx.moveTo(path.pts[0].x, path.pts[0].y);
        for (let i = 1; i <= seg && i < path.pts.length; i++) {
          ctx.lineTo(path.pts[i].x, path.pts[i].y);
        }
        if (seg + 1 < path.pts.length) {
          const cur = path.pts[seg], nxt = path.pts[seg + 1];
          ctx.lineTo(cur.x + (nxt.x - cur.x) * segP, cur.y + (nxt.y - cur.y) * segP);
        }

        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        ctx.shadowColor = path.color;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (seg < path.pts.length - 1) {
          const cur = path.pts[seg], nxt = path.pts[seg + 1];
          const hx = cur.x + (nxt.x - cur.x) * segP;
          const hy = cur.y + (nxt.y - cur.y) * segP;
          ctx.beginPath();
          ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = path.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      ctx.globalAlpha = 1;

      if (!switched && globalP > 0.45) {
        switched = true;
        displayedSection = target;
        if (typeof window !== 'undefined') window.scrollTo(0, 0);
      }

      globalP += 0.018;
      if (globalP < 1.2) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, W, H);
        canvas.style.opacity = '0';
        if (sectionEl) sectionEl.style.opacity = '';
        transitioning = false;
      }
    }
    requestAnimationFrame(frame);
  }

  $effect(() => {
    const target = activeSection.value;
    if (target === displayedSection) return;
    if (transitioning) return; // re-runs when transitioning flips back to false
    runCircuitTrace(target);
  });
</script>

<svelte:head>
  <title>SRUTHIK ISSAC — Cloud & Network Engineer | NOC Portfolio</title>
  <meta name="description" content="Sruthik Issac — Cloud & Network Engineer at HPE Networking, building agentic AI for self-driving networks. AWS Solutions Architect & CCNA certified. NOC-style interactive portfolio." />
  <meta name="author" content="Sruthik Issac" />
  <meta property="og:title" content="SRUTHIK ISSAC — Cloud & Network Engineer | NOC Portfolio" />
  <meta property="og:description" content="Cloud & Network Engineer at HPE Networking. Building agentic AI for self-driving networks. AWS SAA · CCNA · 33 certifications. Interactive NOC-style command center portfolio." />
  <meta property="og:type" content="website" />
  <meta name="theme-color" content="#040710" />
</svelte:head>

<canvas bind:this={canvasEl} class="fx-canvas" aria-hidden="true"></canvas>

<div class="view-stage">
  <div class="view-container">
    <div class="section-stage" bind:this={sectionEl}>
      {#if displayedSection === 'hero'}
        <HeroSection />
      {:else if displayedSection === 'about'}
        <AboutSection />
      {:else if displayedSection === 'domains'}
        <DomainArchitectureSection />
      {:else if displayedSection === 'experience'}
        <ExperienceSection />
      {:else if displayedSection === 'projects'}
        <ProjectsSection />
      {:else if displayedSection === 'certs'}
        <CertificationsSection />
      {:else if displayedSection === 'education'}
        <EducationSection />
      {:else if displayedSection === 'contact'}
        <ContactSection />
      {/if}
    </div>

    <Footer />
  </div>
</div>

<style>
  .view-stage {
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--topbar-height) - 45px);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .view-container {
    grid-area: 1 / 1;
    width: 100%;
    padding-bottom: var(--space-8);
  }

  .fx-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.18s ease-out;
  }
</style>
