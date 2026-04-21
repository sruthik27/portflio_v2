/**
 * Svelte Action to handle Scroll Reveals using IntersectionObserver
 * Usage: <div use:reveal={{ delay: 100, stagger: true }}>
 */
export function reveal(node, options = {}) {
    const { delay = 0, threshold = 0.1, thresholdMax = 1.0, rootMargin = '0px 0px -50px 0px' } = options;

    // Add base class immediately for styling
    node.classList.add('reveal-item');
    if (delay) {
        node.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // If it intersecting, add in-view class to trigger CSS transition
                if (entry.isIntersecting) {
                    node.classList.add('in-view');
                    // Optional: Unobserve after revealing to only play once
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
        }
    };
}
