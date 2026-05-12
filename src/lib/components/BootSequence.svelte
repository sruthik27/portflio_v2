<script>
    import { onMount } from 'svelte';
    import { bootComplete, visitorCity, visitorISP } from '$lib/stores.svelte.js';
    import { initAudio, playPing } from '$lib/utils/audio.js';

    let isVisible = $state(true);
    let visibleLines = $state(0);
    let ipTargetStr = $state('EXTERNAL NETWORK');
    let bootOut = $state(false);
    let isReady = $state(false);

    // Hardcoded boot lines
    const baseLines = [
        '[  OK  ]  Loading identity module............... sruthik.issac',
        '[  OK  ]  Verifying credentials................. AWS-SAA · CCNA · LANGCHAIN',
        '[  OK  ]  Resolving hostname.................... noc.career_os.local',
        // Line 3 (0-indexed) will be the IP one
        null,
        '[  OK  ]  Mounting experience volume............ 2024-02 → present',
        '[  OK  ]  Loading skill clusters................ 50 services detected',
        '[  OK  ]  Initializing networking stack......... CCNA · AI_FOR_NETWORKING',
        '[  OK  ]  Activating cloud modules.............. AWS · AZURE · K8S',
        '[  OK  ]  Loading AI/ML subsystems.............. LANGCHAIN · LANGGRAPH · MCP · RAG',
        '<span class="warn">[ WARN ]</span>  33 certifications found............... some require renewal check',
        '[  OK  ]  Starting project registry............. 15 deployments indexed',
        '[  OK  ]  Uptime counter initialized............ Feb 1, 2024 → now',
        '[  OK  ]  Ambient audio module.................. WAITING FOR USER INPUT',
        '[  OK  ]  All systems nominal.'
    ];

    function getGuestNodeFingerprint() {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'EXTERNAL NETWORK';
        const locale = (navigator.language || 'en-US').toUpperCase();
        const platform = navigator.userAgentData?.platform || navigator.platform || 'WEB';
        const normalizedTimeZone = timeZone.replaceAll('_', ' ');

        visitorCity.value = normalizedTimeZone;
        visitorISP.value = `${platform} · ${locale}`;

        return `${normalizedTimeZone} — ${platform} · ${locale}`;
    }

    onMount(() => {
        // Only run on client after hydration
        const booted = sessionStorage.getItem('booted');
        if (booted === '1') {
            bootComplete.value = true;
            isVisible = false;
            return;
        }

        // Avoid mixed-content and rate-limited third-party geo APIs in production.
        ipTargetStr = getGuestNodeFingerprint();

        // Loop to reveal lines
        let delay = 400; // start after logo face in
        baseLines.forEach((_, i) => {
            setTimeout(() => {
                visibleLines = i + 1;
                if (visibleLines >= baseLines.length) {
                    setTimeout(() => isReady = true, 500);
                }
            }, delay);
            delay += 115; // 115ms stagger per line
        });
    });

    async function handleSkip() {
        if (!isVisible || bootOut) return;
        
        // Attempt to unlock audio right on this mandatory first click/interaction
        try {
            await initAudio();
            playPing();
        } catch (e) {
            console.error("Audio unlock failed:", e);
        }

        bootOut = true;
        sessionStorage.setItem('booted', '1');
        
        setTimeout(() => {
            bootComplete.value = true;
            isVisible = false;
        }, 800);
    }

    function handleOverlayKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
            e.preventDefault();
            handleSkip();
        }
    }

    function handleWindowKeydown(e) {
        if (!isVisible) return;
        if (isReady) {
            if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
            handleSkip();
        } else if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSkip();
        }
    }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if isVisible}
    <div
        class="boot-overlay"
        class:boot-out={bootOut}
        onclick={handleSkip}
        onkeydown={handleOverlayKeydown}
        role="button"
        tabindex="0"
        aria-label="Skip boot sequence"
    >
        <div class="boot-container">
            <h1 class="boot-logo">// CAREER_OS</h1>
            
            <div class="terminal">
                <p class="boot-header">CAREER_OS v9.4 — BOOTING...</p>
                <p class="boot-divider">──────────────────────────────────────────────────────────</p>
                
                <div class="terminal-lines">
                    {#each baseLines.slice(0, visibleLines) as line, i}
                        {#if i === 3}
                            <p class="terminal-line">[  OK  ]  Establishing route to guest node...... {ipTargetStr}</p>
                        {:else}
                            <p class="terminal-line">{@html line}</p>
                        {/if}
                    {/each}
                    <div class="cursor" class:hidden={isReady}></div>
                </div>

                {#if isReady}
                    <p class="boot-divider">──────────────────────────────────────────────────────────</p>
                    <div class="access-prompt-wrapper">
                        <button class="access-prompt" type="button" onclick={handleSkip}>
                            <span class="prompt-pulse"></span>
                            <span class="prompt-text">SYSTEM READY. <span class="highlight">PRESS ANY KEY</span> OR CLICK TO ENTER.</span>
                            <span class="prompt-bracket">]</span>
                        </button>
                    </div>
                {/if}
                
                <div class="progress-track">
                    <div class="progress-fill" class:complete={isReady}></div>
                </div>
            </div>

            {#if !isReady}
                <p class="skip-hint">PRESS ESC OR CLICK ANYWHERE TO SKIP</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .boot-overlay {
        position: fixed;
        inset: 0;
        background-color: #000000;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.8s ease-out;
        cursor: pointer; /* Suggests the entire screen is clickable */
    }

    .boot-overlay.boot-out {
        opacity: 0;
        pointer-events: none;
    }

    .boot-container {
        width: 100%;
        max-width: 650px;
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        position: relative;
    }

    .boot-logo {
        font-family: var(--font-display);
        font-size: 2rem;
        font-weight: 700;
        color: var(--cyan);
        text-shadow: 0 0 15px var(--cyan-glow);
        animation: fadeIn 0.4s ease-out forwards;
        opacity: 0;
        letter-spacing: 0.05em;
    }

    .terminal {
        font-family: var(--font-mono);
        color: var(--green);
        font-size: 0.72rem;
        line-height: 1.7;
        min-height: 480px; /* Prevent jumping */
        animation: fadeIn 0.4s ease-out 0.2s forwards;
        opacity: 0;
        background: rgba(0, 15, 15, 0.4);
        padding: var(--space-6);
        border: 1px solid rgba(0, 255, 255, 0.1);
        border-radius: 8px;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.5);
    }

    .boot-header {
        color: var(--text-primary);
        font-size: 0.8rem;
        letter-spacing: 0.1em;
        margin-bottom: var(--space-2);
    }
    
    .boot-divider {
        color: var(--cyan);
        opacity: 0.3;
        margin: var(--space-3) 0;
        overflow: hidden;
        white-space: nowrap;
    }

    .terminal-lines {
        position: relative;
    }

    .terminal-line {
        margin: 0;
        white-space: pre-wrap;
    }

    .terminal-line :global(.warn) {
        color: var(--amber);
        text-shadow: 0 0 5px rgba(255, 150, 0, 0.5);
    }

    .cursor {
        display: inline-block;
        width: 8px;
        height: 14px;
        background-color: var(--cyan);
        animation: blink 1s step-end infinite;
        vertical-align: text-bottom;
        margin-left: 4px;
        box-shadow: 0 0 8px var(--cyan-glow);
    }

    .cursor.hidden {
        display: none;
    }

    /* PREMIUM ACCESS PROMPT */
    .access-prompt-wrapper {
        margin-top: var(--space-5);
        display: flex;
        justify-content: flex-start;
        animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .access-prompt {
        background: rgba(0, 255, 255, 0.05);
        border: 1px solid rgba(0, 255, 255, 0.3);
        padding: var(--space-4) var(--space-6);
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: var(--space-4);
        color: var(--cyan);
        font-family: var(--font-mono);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 15px rgba(0, 255, 255, 0.05);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        width: 100%;
    }

    .access-prompt::before {
        content: "[";
        position: absolute;
        left: 12px;
        font-size: 1.2rem;
        opacity: 0.5;
        transition: transform 0.3s ease;
    }

    .prompt-bracket {
        position: absolute;
        right: 12px;
        font-size: 1.2rem;
        opacity: 0.5;
        transition: transform 0.3s ease;
    }

    .access-prompt:hover {
        background: rgba(0, 255, 255, 0.15);
        border-color: rgba(0, 255, 255, 0.6);
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1);
        transform: translateY(-2px);
    }

    .access-prompt:hover::before {
        transform: translateX(4px);
    }

    .access-prompt:hover .prompt-bracket {
        transform: translateX(-4px);
    }

    .prompt-pulse {
        width: 8px;
        height: 8px;
        margin-left: 16px;
        background-color: var(--green);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--green-glow);
        animation: pulseHeartbeat 1.5s infinite;
        flex-shrink: 0;
    }

    .prompt-text {
        color: var(--text-secondary);
    }

    .prompt-text .highlight {
        color: var(--text-primary);
        font-weight: 700;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }

    @keyframes pulseHeartbeat {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.5); }
        70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(0, 255, 0, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 255, 0, 0); }
    }

    @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* END PROMPT STYLES */

    .progress-track {
        margin-top: var(--space-6);
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, var(--cyan), var(--green));
        box-shadow: 0 0 8px var(--green-glow);
        animation: fillProgress 2.8s ease-out 0.5s forwards;
    }

    .progress-fill.complete {
        width: 100%;
        background: var(--cyan);
        box-shadow: 0 0 10px var(--cyan-glow);
    }

    .skip-hint {
        position: absolute;
        bottom: -40px;
        left: 0;
        right: 0;
        text-align: center;
        font-family: var(--font-mono);
        color: rgba(255, 255, 255, 0.3);
        font-size: 0.65rem;
        letter-spacing: 0.1em;
        animation: pulseText 2s ease-in-out infinite;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }

    @keyframes fillProgress {
        0% { width: 0%; }
        20% { width: 15%; }
        50% { width: 45%; }
        70% { width: 85%; }
        100% { width: 100%; }
    }

    @keyframes pulseText {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
    }

    @media (max-width: 768px) {
        .terminal {
            font-size: 0.6rem;
            min-height: 400px;
            padding: var(--space-4);
        }
        .access-prompt {
            padding: var(--space-3) var(--space-4);
            font-size: 0.7rem;
        }
    }
</style>
