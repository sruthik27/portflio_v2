<script>
  import { activeSection, tourActive, tourStep } from '$lib/stores.svelte.js';
  import { playBotChirp } from '$lib/utils/audio.js';
  import { onMount } from 'svelte';

  const TOUR_STEPS = [
    {
      section: 'hero',
      position: 'bottom-center',
      speech: "Oh, you woke me up! Alright alright... let me show you around my boss's place. Try to keep up.",
      audio: '/assets/step-0.mp3',
    },
    {
      section: 'about',
      position: 'top-right',
      speech: "My boss Sruthik is a cloud engineer who can't stop building things. Seriously, someone take the keyboard away.",
      audio: '/assets/step-1.mp3',
    },
    {
      section: 'domains',
      position: 'bottom-left',
      speech: "Networking, cloud, and AI — the holy trinity that keeps him up at nights. He calls it passion. I call it an addiction.",
      audio: '/assets/step-2.mp3',
    },
    {
      section: 'experience',
      position: 'top-left',
      speech: "From intern out of college to building self-driving solutions at HPE. Not bad for someone who Googles basic Linux commands sometimes.",
      audio: '/assets/step-3.mp3',
    },
    {
      section: 'projects',
      position: 'bottom-right',
      speech: "Side projects — his real love language. Each one of these started as a 'quick weekend thing' and ended up consuming his life for months.",
      audio: '/assets/step-4.mp3',
    },
    {
      section: 'certs',
      position: 'top-right',
      speech: "33 certifications. At this point I think he's collecting them like they're Pokémon cards. Gotta catch 'em all I guess.",
      audio: '/assets/step-5.mp3',
    },
    {
      section: 'education',
      position: 'bottom-left',
      speech: "Where it all started — the academic origin story.",
      audio: '/assets/step-6.mp3',
    },
    {
      section: 'contact',
      position: 'center',
      speech: "And that's the full tour! If you want to work with this guy or just chat about tech, the signal's open. NOC-BOT signing off... back to my nap.",
      audio: '/assets/step-7.mp3',
    },
  ];

  const TYPE_SPEED = 25;
  const MIN_STEP_DURATION = 6000; // Minimum time per step if no audio
  const POST_SPEECH_PAUSE = 1500; // Pause after audio/typing ends before advancing

  let visible = $state(false);
  let typing = $state(false);
  let speaking = $state(false);
  let displayedText = $state('');
  let botEntered = $state(false);
  let exiting = $state(false);
  let typeTimer = null;
  let advanceTimer = null;
  let currentAudio = null;
  let audioFinished = false;
  let typingFinished = false;

  let currentStep = $derived(TOUR_STEPS[tourStep.value] || TOUR_STEPS[0]);
  let progress = $derived(((tourStep.value + 1) / TOUR_STEPS.length) * 100);

  function tryAdvance(stepIndex) {
    // Only advance when both audio AND typing are done
    if (audioFinished && typingFinished) {
      speaking = false;
      clearTimeout(advanceTimer);
      advanceTimer = setTimeout(() => {
        navigateToStep(stepIndex + 1);
      }, POST_SPEECH_PAUSE);
    }
  }

  function typeText(text, stepIndex) {
    displayedText = '';
    typing = true;
    speaking = true;
    typingFinished = false;
    let i = 0;
    clearInterval(typeTimer);
    typeTimer = setInterval(() => {
      if (i < text.length) {
        displayedText += text[i];
        i++;
      } else {
        clearInterval(typeTimer);
        typing = false;
        typingFinished = true;
        tryAdvance(stepIndex);
      }
    }, TYPE_SPEED);
  }

  function playStepAudio(step, stepIndex) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    audioFinished = false;

    if (step.audio) {
      currentAudio = new Audio(step.audio);
      currentAudio.volume = 0.85;

      currentAudio.onended = () => {
        audioFinished = true;
        tryAdvance(stepIndex);
      };

      currentAudio.onerror = () => {
        // If audio fails, just use timer-based fallback
        audioFinished = true;
        tryAdvance(stepIndex);
      };

      currentAudio.play().catch(() => {
        // Autoplay blocked — fall back to timer
        audioFinished = true;
        tryAdvance(stepIndex);
      });
    } else {
      // No audio file — use minimum duration
      audioFinished = true;
    }
  }

  function navigateToStep(stepIndex) {
    if (stepIndex >= TOUR_STEPS.length) {
      endTour();
      return;
    }
    tourStep.value = stepIndex;
    const step = TOUR_STEPS[stepIndex];
    activeSection.value = step.section;
    window.scrollTo(0, 0);

    // Reset sync flags
    audioFinished = false;
    typingFinished = false;

    setTimeout(() => {
      playBotChirp();
      typeText(step.speech, stepIndex);
      playStepAudio(step, stepIndex);
    }, 600);

    // Safety timeout — max 20 seconds per step
    clearTimeout(advanceTimer);
    advanceTimer = setTimeout(() => {
      navigateToStep(stepIndex + 1);
    }, 20000);
  }

  function skipStep() {
    clearTimeout(advanceTimer);
    clearInterval(typeTimer);
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    speaking = false;
    navigateToStep(tourStep.value + 1);
  }

  function endTour() {
    clearTimeout(advanceTimer);
    clearInterval(typeTimer);
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    speaking = false;
    exiting = true;

    setTimeout(() => {
      tourActive.value = false;
      tourStep.value = 0;
      visible = false;
      botEntered = false;
      exiting = false;
      displayedText = '';
      activeSection.value = 'hero';
      window.scrollTo(0, 0);
    }, 600);
  }

  $effect(() => {
    if (tourActive.value && !visible) {
      visible = true;
      setTimeout(() => {
        botEntered = true;
        navigateToStep(0);
      }, 400);
    }
  });

  onMount(() => {
    return () => {
      clearTimeout(advanceTimer);
      clearInterval(typeTimer);
      if (currentAudio) { currentAudio.pause(); }
    };
  });
</script>

{#if visible}
  <div class="tour-overlay" class:exiting>
    <!-- Progress bar -->
    <div class="tour-progress">
      <div class="tour-progress__fill" style="width: {progress}%"></div>
      <span class="tour-progress__label">
        TOUR · {tourStep.value + 1}/{TOUR_STEPS.length}
      </span>
    </div>

    <!-- Bot character -->
    <div
      class="noc-bot"
      class:entered={botEntered}
      class:pos-top-right={currentStep.position === 'top-right'}
      class:pos-top-left={currentStep.position === 'top-left'}
      class:pos-bottom-right={currentStep.position === 'bottom-right'}
      class:pos-bottom-left={currentStep.position === 'bottom-left'}
      class:pos-bottom-center={currentStep.position === 'bottom-center'}
      class:pos-center={currentStep.position === 'center'}
    >
      <!-- Bot body -->
      <div class="noc-bot__body">
        <div class="noc-bot__antenna">
          <div class="noc-bot__antenna-ring"></div>
          <div class="noc-bot__antenna-tip"></div>
          <div class="noc-bot__antenna-stem"></div>
        </div>
        <div class="noc-bot__head">
          <div class="noc-bot__ear noc-bot__ear--left"></div>
          <div class="noc-bot__ear noc-bot__ear--right"></div>
          <div class="noc-bot__visor">
            <div class="noc-bot__visor-glass"></div>
            <div class="noc-bot__eyes">
              <div class="noc-bot__eye noc-bot__eye--left"></div>
              <div class="noc-bot__eye noc-bot__eye--right"></div>
            </div>
            <div class="noc-bot__mouth" class:noc-bot__mouth--speaking={speaking}></div>
          </div>
        </div>
        <div class="noc-bot__chassis">
           <div class="noc-bot__core"></div>
        </div>
        <div class="noc-bot__thruster">
           <div class="noc-bot__flame"></div>
        </div>
        <div class="noc-bot__glow"></div>
      </div>

      <!-- Speech bubble -->
      {#if displayedText}
        <div class="noc-bot__speech">
          <span class="noc-bot__speech-text">{displayedText}</span>
          {#if typing}
            <span class="noc-bot__cursor">▌</span>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Tour controls -->
    <div class="tour-controls">
      <button class="tour-btn tour-btn--skip" onclick={skipStep}>
        {tourStep.value < TOUR_STEPS.length - 1 ? 'SKIP ▶' : 'FINISH ▶'}
      </button>
      <button class="tour-btn tour-btn--exit" onclick={endTour}>
        ✕ EXIT
      </button>
    </div>
  </div>
{/if}

<style>
  .tour-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    animation: overlayIn 0.5s ease-out forwards;
  }

  .tour-overlay.exiting {
    animation: overlayOut 0.6s ease-in forwards;
  }

  @keyframes overlayIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes overlayOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  /* ── Progress Bar ── */
  .tour-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.05);
    z-index: 10000;
    pointer-events: auto;
  }

  .tour-progress__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--green), var(--cyan));
    transition: width 0.6s ease-out;
    box-shadow: 0 0 10px var(--green);
  }

  .tour-progress__label {
    position: absolute;
    right: 16px;
    top: 8px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  /* ── Bot Character ── */
  .noc-bot {
    position: fixed;
    z-index: 10001;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0;
    transform: scale(0) rotate(-30deg);
  }

  .noc-bot.entered {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  /* Positions */
  .noc-bot.pos-bottom-center { bottom: 100px; left: 50%; transform: translateX(-50%); flex-direction: column; align-items: center; }
  .noc-bot.pos-bottom-center.entered { transform: translateX(-50%) scale(1) rotate(0deg); }
  .noc-bot.pos-top-right { top: 140px; right: 60px; flex-direction: row-reverse; }
  .noc-bot.pos-top-left { top: 140px; left: 60px; }
  .noc-bot.pos-bottom-right { bottom: 100px; right: 60px; flex-direction: row-reverse; }
  .noc-bot.pos-bottom-left { bottom: 100px; left: 60px; }
  .noc-bot.pos-center { top: 50%; left: 50%; transform: translate(-50%, -50%); flex-direction: column; align-items: center; }
  .noc-bot.pos-center.entered { transform: translate(-50%, -50%) scale(1) rotate(0deg); }

  /* Bot body */
  .noc-bot__body {
    position: relative;
    width: 64px;
    height: 80px;
    flex-shrink: 0;
    animation: botFloat 4s ease-in-out infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  @keyframes botFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .noc-bot__antenna {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    margin-bottom: -2px;
  }

  .noc-bot__antenna-tip {
    width: 8px;
    height: 8px;
    background: var(--green);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--green), 0 0 20px var(--green);
    animation: antennaPulse 2s ease-in-out infinite;
    position: relative;
    z-index: 2;
  }

  .noc-bot__antenna-ring {
    position: absolute;
    top: 3px;
    width: 14px;
    height: 4px;
    border: 1px solid var(--green);
    border-radius: 50%;
    opacity: 0.5;
    animation: ringPulse 2s ease-in-out infinite;
  }

  @keyframes ringPulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.5); opacity: 0; }
  }

  @keyframes antennaPulse {
    0%, 100% { box-shadow: 0 0 10px var(--green), 0 0 20px var(--green); opacity: 1; }
    50% { box-shadow: 0 0 5px var(--green), 0 0 10px var(--green); opacity: 0.7; }
  }

  .noc-bot__antenna-stem {
    width: 2px;
    height: 12px;
    background: linear-gradient(to bottom, var(--cyan), #1a2c4b);
  }

  .noc-bot__head {
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
  }

  .noc-bot__ear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 20px;
    background: #334155;
    border-radius: 4px;
    box-shadow: inset 0 0 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .noc-bot__ear--left {
    left: -4px;
    border-radius: 6px 2px 2px 6px;
  }

  .noc-bot__ear--right {
    right: -4px;
    border-radius: 2px 6px 6px 2px;
  }

  .noc-bot__visor {
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
      inset 0 0 12px rgba(0, 212, 255, 0.15),
      0 1px 2px rgba(255,255,255,0.1);
    border: 1px solid rgba(0, 212, 255, 0.2);
    margin-top: 2px;
  }

  .noc-bot__visor-glass {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    border-radius: 10px 10px 0 0;
    pointer-events: none;
  }

  .noc-bot__eyes {
    display: flex;
    gap: 12px;
    margin-bottom: 4px;
    z-index: 2;
  }

  .noc-bot__eye {
    width: 10px;
    height: 10px;
    background: var(--cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan);
    animation: eyeBlink 4s ease-in-out infinite;
  }

  .noc-bot__eye--right {
    animation-delay: 0.1s;
  }

  @keyframes eyeBlink {
    0%, 42%, 48%, 100% { transform: scaleY(1); }
    45% { transform: scaleY(0.1); }
  }

  .noc-bot__mouth {
    width: 14px;
    height: 4px;
    background: var(--green);
    border-radius: 4px;
    box-shadow: 0 0 8px var(--green);
    margin-top: 2px;
    opacity: 0.8;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .noc-bot__mouth--speaking {
    background: var(--cyan);
    box-shadow: 0 0 12px var(--cyan);
    animation: animeMouth 1.2s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes animeMouth {
    0%   { width: 14px; height: 4px; border-radius: 4px; }
    20%  { width: 6px; height: 8px; border-radius: 5px; transform: translateY(1px); } 
    40%  { width: 16px; height: 3px; border-radius: 4px; transform: translateY(0); }
    60%  { width: 10px; height: 6px; border-radius: 5px; transform: translateY(1px); }
    80%  { width: 18px; height: 10px; border-radius: 6px 6px 14px 14px; transform: translateY(2px); } 
    100% { width: 8px; height: 5px; border-radius: 4px; transform: translateY(0); }
  }

  .noc-bot__chassis {
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

  .noc-bot__core {
    width: 8px;
    height: 8px;
    background: var(--cyan);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--cyan);
    animation: corePulse 2s infinite alternate;
  }

  @keyframes corePulse {
    0% { opacity: 0.5; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 12px var(--cyan); }
  }

  .noc-bot__thruster {
    width: 16px;
    height: 8px;
    background: #0f172a;
    border-radius: 0 0 8px 8px;
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
  }

  .noc-bot__flame {
    width: 10px;
    height: 20px;
    background: linear-gradient(180deg, var(--cyan) 0%, transparent 100%);
    border-radius: 10px;
    opacity: 0.8;
    animation: thrusterFlicker 0.1s infinite;
    transform-origin: top;
  }

  @keyframes thrusterFlicker {
    0% { transform: scaleY(1); opacity: 0.8; }
    50% { transform: scaleY(1.2); opacity: 1; }
    100% { transform: scaleY(0.9); opacity: 0.9; }
  }

  .noc-bot__glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
  }

  /* ── Speech Bubble ── */
  .noc-bot__speech {
    background: rgba(8, 16, 32, 0.92);
    border: 1px solid var(--cyan);
    border-radius: 8px;
    padding: 12px 16px;
    max-width: 380px;
    min-width: 200px;
    box-shadow:
      0 0 20px rgba(0, 212, 255, 0.1),
      0 4px 30px rgba(0, 0, 0, 0.5);
    animation: speechIn 0.3s ease-out;
    pointer-events: auto;
  }

  @keyframes speechIn {
    from { opacity: 0; transform: scale(0.9) translateY(4px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .noc-bot__speech-text {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-primary);
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  .noc-bot__cursor {
    color: var(--cyan);
    animation: cursorBlink 0.6s step-end infinite;
    margin-left: 1px;
  }

  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ── Tour Controls ── */
  .tour-controls {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    gap: 8px;
    z-index: 10001;
    pointer-events: auto;
  }

  .tour-btn {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    padding: 8px 16px;
    border: 1px solid var(--border-subtle);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(8, 16, 32, 0.9);
  }

  .tour-btn--skip {
    color: var(--cyan);
    border-color: rgba(0, 212, 255, 0.3);
  }

  .tour-btn--skip:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: var(--cyan);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
  }

  .tour-btn--exit {
    color: var(--text-muted);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .tour-btn--exit:hover {
    color: var(--red);
    border-color: rgba(255, 80, 80, 0.3);
    background: rgba(255, 80, 80, 0.05);
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .noc-bot.pos-top-right,
    .noc-bot.pos-top-left { top: 120px; left: 20px; right: auto; }
    .noc-bot.pos-bottom-right,
    .noc-bot.pos-bottom-left { bottom: 80px; left: 20px; right: auto; }

    .noc-bot__speech {
      max-width: 260px;
    }

    .tour-controls {
      bottom: 16px;
      right: 16px;
    }
  }
</style>
