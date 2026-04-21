import { audioEnabled } from '$lib/stores.svelte.js';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

let konamiPosition = 0;
let isActive = false;

export function initEasterEggs() {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e) => {
        // Check Konami Code
        const key = e.key;
        if (key.toLowerCase() === KONAMI_CODE[konamiPosition].toLowerCase() || key === KONAMI_CODE[konamiPosition]) {
            konamiPosition++;
            if (konamiPosition === KONAMI_CODE.length) {
                triggerKonami();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
}

function triggerKonami() {
    if (isActive) return;
    isActive = true;

    // Play retro power-up sound if audio is enabled
    if (audioEnabled.value) {
        void playKonamiSound();
    }

    // Apply matrix effect to the body
    document.body.classList.add('konami-active');

    // Remove after 5 seconds
    setTimeout(() => {
        document.body.classList.remove('konami-active');
        isActive = false;
    }, 5000);
}

async function playKonamiSound() {
    const Tone = await import('tone');

    if (Tone.context.state !== 'running') {
        await Tone.start();
    }
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -8;

    const now = Tone.now();
    // Classic arpeggio
    synth.triggerAttackRelease(['C5', 'E5', 'G5', 'C6'], '16n', now);
    synth.triggerAttackRelease(['D5', 'F5', 'A5', 'D6'], '16n', now + 0.15);
    synth.triggerAttackRelease(['E5', 'G5', 'B5', 'E6'], '8n', now + 0.3);
}
