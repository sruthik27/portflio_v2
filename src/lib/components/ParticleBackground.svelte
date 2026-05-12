<script>
  // ─── Hex Topology Network Background (UPGRADE 02) ───────────────────
  // Canvas 2D hex tessellation with mouse-magnetic distortion and pulsing
  // node activity. Replaces the Three.js particle field — lighter bundle,
  // more on-theme for a network engineer portfolio.
  import { onMount } from 'svelte';

  let canvas = $state(null);

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const HEX_SIZE = isMobile ? 34 : 30;
    const INFLUENCE_RADIUS = 120;
    const EDGE_DISTANCE = HEX_SIZE * 2.2;

    let W = 0, H = 0, dpr = 1;
    let nodes = [];
    let mouse = { x: -9999, y: -9999 };
    let rafId;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    function buildGrid() {
      nodes = [];
      const w = HEX_SIZE * 2;
      const h = Math.sqrt(3) * HEX_SIZE;
      const cols = Math.ceil(W / (w * 0.75)) + 2;
      const rows = Math.ceil(H / h) + 2;
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * w * 0.75;
          const y = r * h + (c % 2 === 0 ? 0 : h / 2);
          nodes.push({
            ox: x,
            oy: y,
            x,
            y,
            pulse: Math.random() * Math.PI * 2,
            speed: 0.008 + Math.random() * 0.012,
            active: Math.random() > 0.62
          });
        }
      }
    }

    function drawHex(x, y, size, alpha) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(a);
        const py = y + size * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    function frame() {
      rafId = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulse += n.speed;

        const dx = mouse.x - n.ox;
        const dy = mouse.y - n.oy;
        const dist = Math.hypot(dx, dy);
        const push = dist < INFLUENCE_RADIUS ? 1 - dist / INFLUENCE_RADIUS : 0;
        if (push > 0) {
          const angle = Math.atan2(n.oy - mouse.y, n.ox - mouse.x);
          n.x = n.ox + Math.cos(angle) * push * 14;
          n.y = n.oy + Math.sin(angle) * push * 14;
        } else {
          n.x = n.ox;
          n.y = n.oy;
        }

        const glow = (Math.sin(n.pulse) + 1) / 2;
        const alpha = n.active ? 0.06 + glow * 0.1 : 0.035;
        drawHex(n.x, n.y, HEX_SIZE - 4, alpha);

        if (n.active && glow > 0.72) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,136,${(glow - 0.72) * 2.2})`;
          ctx.fill();
        }
      }

      // Connecting edges between nearby nodes (sparse to stay performant)
      // Skip every other pair for a lighter look + better perf
      const maxEdgeSq = EDGE_DISTANCE * EDGE_DISTANCE;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // only look ahead a few indices — grid-adjacent nodes are always within the window
        const jMax = Math.min(nodes.length, i + 8);
        for (let j = i + 1; j < jMax; j++) {
          const b = nodes[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq < maxEdgeSq) {
            const edgeAlpha = (1 - dSq / maxEdgeSq) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,212,255,${edgeAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame);
    } else {
      // Single static paint
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) drawHex(n.x, n.y, HEX_SIZE - 4, n.active ? 0.1 : 0.04);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  });
</script>

<canvas bind:this={canvas} class="particle-bg" aria-hidden="true"></canvas>

<style>
  .particle-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    opacity: 0;
    animation: fadeBgIn 2s ease-in-out 0.6s forwards;
  }

  @keyframes fadeBgIn {
    to { opacity: 0.85; }
  }

  :global(body.mode-executive) .particle-bg {
    display: none;
  }
</style>
