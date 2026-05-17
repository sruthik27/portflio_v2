/**
 * NOC Crosshair Cursor (UPGRADE 05)
 *
 * Hides the native cursor on pointer-fine devices and renders a tactical
 * targeting reticle (pulsing ring + crosshair + centre dot) with a short
 * fading trail. Click emits a ripple. No-op on touch / coarse pointers
 * and when the user prefers reduced motion.
 */
const TRAIL_LEN = 5;

export function initNocCursor() {
  if (typeof window === 'undefined') return () => {};

  const fine = window.matchMedia('(pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return () => {};

  // Idempotency guard
  if (document.body.classList.contains('has-noc-cursor')) return () => {};
  document.body.classList.add('has-noc-cursor');

  const root = document.createElement('div');
  root.className = 'noc-cursor-root';
  root.setAttribute('aria-hidden', 'true');

  const ring = document.createElement('span');
  ring.className = 'noc-cursor__ring';
  const cross = document.createElement('span');
  cross.className = 'noc-cursor__cross';
  const dot = document.createElement('span');
  dot.className = 'noc-cursor__dot';
  root.append(ring, cross, dot);
  document.body.appendChild(root);

  const trail = [];
  for (let i = 0; i < TRAIL_LEN; i++) {
    const t = document.createElement('span');
    t.className = 'noc-cursor__trail';
    t.style.opacity = String(0.5 - i * 0.09);
    t.style.width = t.style.height = `${4 - i * 0.5}px`;
    document.body.appendChild(t);
    trail.push({ el: t, x: 0, y: 0 });
  }

  let mx = -100, my = -100;
  let rafId = null;

  function tick() {
    rafId = null;
    root.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].x = trail[i - 1].x;
      trail[i].y = trail[i - 1].y;
    }
    trail[0].x = mx;
    trail[0].y = my;
    for (const t of trail) {
      t.el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
    }
  }

  function onMove(e) {
    mx = e.clientX;
    my = e.clientY;
    // If the cursor was already inside the viewport on page load, the document
    // mouseenter event never fires — only mousemove does. Promote to visible
    // here so the reticle replaces the trail-dots-only state seen after refresh.
    if (!root.classList.contains('is-visible')) {
      root.classList.add('is-visible');
    }
    if (rafId == null) rafId = requestAnimationFrame(tick);
  }

  function onEnter() { root.classList.add('is-visible'); }
  function onLeave() {
    root.classList.remove('is-visible');
    for (const t of trail) t.el.style.opacity = '0';
  }

  // Hover state for interactive elements (expand ring)
  function onOverTarget(e) {
    const el = e.target;
    if (!(el instanceof Element)) return;
    const interactive = el.closest('a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]');
    root.classList.toggle('is-over-interactive', !!interactive);
  }

  function onClick(e) {
    const r = document.createElement('span');
    r.className = 'noc-cursor__ripple';
    r.style.left = `${e.clientX}px`;
    r.style.top = `${e.clientY}px`;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 650);
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseover', onOverTarget, { passive: true });
  document.addEventListener('mouseenter', onEnter);
  document.addEventListener('mouseleave', onLeave);
  window.addEventListener('mousedown', onClick);

  return () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseover', onOverTarget);
    document.removeEventListener('mouseenter', onEnter);
    document.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('mousedown', onClick);
    if (rafId != null) cancelAnimationFrame(rafId);
    root.remove();
    for (const t of trail) t.el.remove();
    document.body.classList.remove('has-noc-cursor');
  };
}
