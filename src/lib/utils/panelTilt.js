/**
 * Panel 3D tilt + holographic light-origin tracking (UPGRADE 04 — JS layer)
 *
 * Companion to the CSS rotating conic-gradient in variables.css. This script
 * tracks the pointer over any `.panel` and applies a subtle perspective tilt
 * plus a mouse-following gradient centre (`--mx` / `--my`), producing the
 * foil-card light-diffraction feel shown in the design brief's demo.
 *
 * No-op on touch / coarse pointers and when the user prefers reduced motion.
 */

const TILT_DEG = 8;          // max rotation either axis
const SCALE = 1.015;         // tiny lift on hover
const DAMP_MS = 180;         // transition for returning to rest
const ACTIVE_SEL = '.panel:not(.panel--static)';

export function initPanelTilt() {
  if (typeof window === 'undefined') return () => {};
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return () => {};

  let current = null;      // panel currently under the pointer
  let rafId = null;
  let pendingEvent = null;

  function executiveOff() {
    return document.body.classList.contains('mode-executive');
  }

  function resetPanel(p) {
    if (!p) return;
    p.style.transition = `transform ${DAMP_MS}ms var(--ease), box-shadow ${DAMP_MS}ms var(--ease)`;
    p.style.transform = '';
    p.style.boxShadow = '';
    p.style.removeProperty('--mx');
    p.style.removeProperty('--my');
    // Clear the transition after it settles so future tracking stays snappy
    setTimeout(() => { if (p) p.style.transition = ''; }, DAMP_MS + 20);
  }

  function applyTilt(e) {
    rafId = null;
    const p = current;
    if (!p) return;
    const r = p.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (y - 0.5) * -TILT_DEG;
    const ry = (x - 0.5) * TILT_DEG;
    p.style.transform = `perspective(600px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${SCALE})`;
    p.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
    p.style.setProperty('--my', (y * 100).toFixed(1) + '%');
    p.style.boxShadow = `0 10px 30px rgba(0,0,0,0.45), 0 0 24px rgba(0,212,255,0.08), ${((x - 0.5) * -12).toFixed(1)}px ${((y - 0.5) * -12).toFixed(1)}px 24px rgba(168,85,247,0.07)`;
  }

  function onMove(e) {
    if (executiveOff()) {
      if (current) { resetPanel(current); current = null; }
      return;
    }
    const target = e.target instanceof Element ? e.target.closest(ACTIVE_SEL) : null;
    if (target !== current) {
      if (current) resetPanel(current);
      current = target;
      if (current) current.style.transition = '';
    }
    if (!current) return;
    pendingEvent = e;
    if (rafId == null) rafId = requestAnimationFrame(() => applyTilt(pendingEvent));
  }

  function onLeave() {
    if (current) { resetPanel(current); current = null; }
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);
  window.addEventListener('blur', onLeave);

  return () => {
    window.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('blur', onLeave);
    if (rafId != null) cancelAnimationFrame(rafId);
    if (current) resetPanel(current);
  };
}
