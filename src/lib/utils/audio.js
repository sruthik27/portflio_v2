let isInitialized = false;
let masterCompressor = null;
let ambientSynth = null;
let noiseSynth = null;
let pingSynth = null;
let lfo = null;
let ToneModule = null;
let toneLoadPromise = null;
let lastPingAt = 0;

// Thruster audio nodes
let thrusterNoise = null;
let thrusterFilter = null;
let thrusterEnv = null;
let thrusterVolume = null;

// Bot Voice nodes
let botSynth = null;

async function loadTone() {
    if (ToneModule) return ToneModule;
    if (!toneLoadPromise) {
        toneLoadPromise = import('tone').then((module) => {
            ToneModule = module;
            return module;
        });
    }
    return toneLoadPromise;
}

export async function initAudio() {
    if (isInitialized) {
        return loadTone();
    }

    try {
        const Tone = await loadTone();
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }

        masterCompressor = new Tone.Compressor({
            threshold: -30,
            ratio: 6,
            attack: 0.3,
            release: 0.1
        }).toDestination();

        // 1. Ambient Drone (Sine)
        ambientSynth = new Tone.FMSynth({
            harmonicity: 0.5,
            modulationIndex: 1.2,
            oscillator: { type: "sine" },
            modulation: { type: "triangle" },
            envelope: { attack: 2, decay: 0, sustain: 1, release: 3 }
        }).connect(masterCompressor);

        lfo = new Tone.LFO(0.05, -30, -15).start();
        lfo.connect(ambientSynth.volume);

        // 2. Data Center Airflow (Pink Noise)
        noiseSynth = new Tone.Noise("pink");
        const noiseFilter = new Tone.Filter(400, "lowpass");
        noiseSynth.chain(noiseFilter, masterCompressor);
        noiseSynth.volume.value = -35;

        // 3. UI interaction blip (Pluck)
        pingSynth = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 2,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 }
        }).connect(masterCompressor);
        pingSynth.volume.value = -10;

        // 4. Thruster Sound Effect (Brown Noise)
        thrusterNoise = new Tone.Noise("brown").start();
        thrusterFilter = new Tone.Filter(150, "lowpass");
        thrusterEnv = new Tone.AmplitudeEnvelope({
            attack: 0.6,
            decay: 0.1,
            sustain: 1.0,
            release: 1.2
        });
        thrusterVolume = new Tone.Volume(-12); // Reduced volume from 5 for a much milder thrust
        
        thrusterNoise.connect(thrusterFilter);
        thrusterFilter.connect(thrusterEnv);
        thrusterEnv.connect(thrusterVolume);
        thrusterVolume.connect(masterCompressor);

        // 5. Bot Chirp Synth
        botSynth = new Tone.FMSynth({
            harmonicity: 3,
            modulationIndex: 10,
            oscillator: { type: "square" },
            modulation: { type: "sawtooth" },
            envelope: { attack: 0.01, decay: 0.05, sustain: 0, release: 0.05 }
        }).connect(masterCompressor);
        botSynth.volume.value = -12; // Modest volume for a subtle UI effect

        isInitialized = true;
        return Tone;
    } catch (error) {
        console.warn('Audio system unavailable.', error);
        throw error;
    }
}

async function ensureStarted() {
    const Tone = await initAudio();
    if (Tone.context.state !== 'running') {
        await Tone.start();
    }
    return Tone;
}

export function setupGlobalAudioUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = async () => {
        try {
            await ensureStarted();
            // Once unlocked and initialized, we can safely remove these listeners
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
        } catch (e) {
            console.warn("Global audio unlock attempted but failed.");
        }
    };

    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
    window.addEventListener('touchstart', unlock);
}

export async function startAmbient() {
    try {
        await ensureStarted();
        if (isInitialized && ambientSynth && noiseSynth) {
            ambientSynth.triggerAttack("D2");
            noiseSynth.start();
        }
    } catch (e) {
        console.error("startAmbient failed:", e);
    }
}

export function stopAmbient() {
    if (isInitialized && ambientSynth && noiseSynth) {
        ambientSynth.triggerRelease();
        noiseSynth.stop();
    }
}

export async function playPing() {
    try {
        const Tone = await ensureStarted();
        
        if (isInitialized && pingSynth) {
            pingSynth.volume.value = -2;
            const triggerAt = Math.max(Tone.now() + 0.01, lastPingAt + 0.03);
            lastPingAt = triggerAt;
            pingSynth.triggerAttackRelease("C5", "16n", triggerAt);
        }
    } catch (e) {
        console.error("playPing failed:", e);
    }
}

export async function playBotChirp() {
    try {
        const Tone = await ensureStarted();
        if (isInitialized && botSynth) {
            const now = Tone.now();
            // Fast sequence of high robotic pitches
            botSynth.triggerAttackRelease("C6", "32n", now);
            botSynth.triggerAttackRelease("E6", "32n", now + 0.04);
            botSynth.triggerAttackRelease("G6", "32n", now + 0.08);
            botSynth.triggerAttackRelease("C7", "32n", now + 0.12);
        }
    } catch (e) {
        console.error("playBotChirp failed:", e);
    }
}

export async function startThruster() {
    try {
        await ensureStarted();
        
        if (isInitialized && thrusterEnv) {
            // Milder lowpass filter opening for less intrusive high frequencies
            thrusterFilter.frequency.rampTo(400, 0.6);
            thrusterEnv.triggerAttack();
        }
    } catch (e) {
        console.error("startThruster failed:", e);
    }
}

export function stopThruster() {
    if (isInitialized && thrusterEnv) {
        thrusterFilter.frequency.rampTo(150, 1.2);
        thrusterEnv.triggerRelease();
    }
}
