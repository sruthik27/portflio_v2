/**
 * Svelte Action — Scroll reveal with NOC scanner sweep (UPGRADE 06)
 *
 * Usage: <div use:reveal={{ delay: 100, scan: false }}>
 *
 * Default behavior: when the element intersects the viewport, a horizontal
 * scan-line sweeps across it, then the content settles in. Respects
 * prefers-reduced-motion (skips the sweep, still fades in).
 */
export function reveal(node, options = {}) {
    const {
        delay = 0,
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        scan = true
    } = options;

    node.classList.add('reveal-item');
    if (delay) {
        node.style.transitionDelay = `${delay}ms`;
    }

    // Ensure the element can host the absolutely-positioned scan line
    if (scan && typeof window !== 'undefined') {
        const computed = window.getComputedStyle(node);
        if (computed.position === 'static') {
            node.style.position = 'relative';
        }
    }

    const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let scanLine = null;
    let scanCleanup = null;

    function runScan() {
        if (!scan || reduceMotion) {
            node.classList.add('in-view');
            return;
        }

        scanLine = document.createElement('span');
        scanLine.className = 'reveal-scan-line';
        scanLine.setAttribute('aria-hidden', 'true');
        node.appendChild(scanLine);

        // Force layout so the animation restarts reliably
        void scanLine.offsetWidth;
        scanLine.classList.add('running');

        const onEnd = () => {
            node.classList.add('in-view');
            if (scanLine) {
                scanLine.classList.remove('running');
                scanLine.classList.add('gone');
                // Remove after its opacity transition
                setTimeout(() => {
                    if (scanLine && scanLine.parentNode) scanLine.parentNode.removeChild(scanLine);
                    scanLine = null;
                }, 300);
            }
        };

        // Apply `in-view` partway through the sweep for a painted-in effect
        const REVEAL_AT = 420;
        const END_AT = 800;
        const t1 = setTimeout(() => node.classList.add('in-view'), REVEAL_AT);
        const t2 = setTimeout(onEnd, END_AT);
        scanCleanup = () => { clearTimeout(t1); clearTimeout(t2); };
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runScan();
                    observer.unobserve(node);
                }
            });
        },
        { rootMargin, threshold }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
            if (scanCleanup) scanCleanup();
            if (scanLine && scanLine.parentNode) scanLine.parentNode.removeChild(scanLine);
        }
    };
}
