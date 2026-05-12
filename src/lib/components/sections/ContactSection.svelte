<script>
  import { reveal } from '$lib/actions/scroll.js';
  import { PUBLIC_CONTACT_API_URL } from '$env/static/public';

  let traceState = $state('idle'); // idle, running, complete
  let linesVisible = $state(0);
  let formOpen = $state(false);
  let composeSubject = $state('');
  let composeBody = $state('');
  let composeReplyTo = $state('');
  let honeypot = $state('');
  let submitState = $state('idle'); // idle, sending, sent, error
  let errorMsg = $state('');

  // Attempt to mock a realistic trace
  const traceLines = [
    { text: "1.   visitor.browser.local                   1 ms    ████" },
    { text: "2.   isp-backbone-node-01.net               14 ms    ████" },
    { text: "3.   global-internet-exchange.ix            31 ms    ████" },
    { text: "4.   india-gateway.in                       58 ms    ████" },
    { text: "5.   chennai.datacenter.hpe.aruba.local     72 ms    ████" },
    { text: "6.   sruthik.issac.engineer                  ✓ ms    REACHED" }
  ];

  async function runTrace() {
    if (traceState === 'running') return;
    traceState = 'running';
    linesVisible = 0;
    
    await new Promise(r => setTimeout(r, 600)); // init sequence

    for (let i = 0; i < traceLines.length; i++) {
        linesVisible = i + 1;
        await new Promise(r => setTimeout(r, 400));
    }

    await new Promise(r => setTimeout(r, 300));
    traceState = 'complete';
  }

  async function sendMessage() {
    if (submitState === 'sending') return;
    if (!composeBody.trim()) {
      submitState = 'error';
      errorMsg = 'BODY REQUIRED';
      return;
    }

    submitState = 'sending';
    errorMsg = '';

    try {
      const res = await fetch(PUBLIC_CONTACT_API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          subject: composeSubject.trim(),
          body: composeBody.trim(),
          replyTo: composeReplyTo.trim(),
          _hp: honeypot
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      submitState = 'sent';
      setTimeout(() => {
        formOpen = false;
        composeSubject = '';
        composeBody = '';
        composeReplyTo = '';
        submitState = 'idle';
      }, 2000);
    } catch (err) {
      submitState = 'error';
      errorMsg = (err?.message || 'NETWORK ERROR').toUpperCase();
    }
  }

  function traceTrigger(node) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && traceState === 'idle') {
        runTrace();
      }
    }, { threshold: 0.2 });
    
    observer.observe(node);
    
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  const peers = [
    { label: "PRIMARY EMAIL", val: "sruthik2016@gmail.com", btn: "[→ CONNECT]", url: "mailto:sruthik2016@gmail.com", blank: false },
    { label: "PROFESSIONAL NETWORK", val: "linkedin.com/in/sruthik-issac", btn: "[→ OPEN]", url: "https://www.linkedin.com/in/sruthik-issac/", blank: true },
    { label: "GITHUB", val: "github.com/sruthik27", btn: "[→ OPEN]", url: "https://github.com/sruthik27", blank: true },
    { label: "DEV.TO BLOG", val: "dev.to/sruthik_issac", btn: "[→ READ]", url: "https://dev.to/sruthik_issac", blank: true },
    { label: "LEGACY PORTFOLIO", val: "sruthik2016.pythonanywhere.com", btn: "[→ VISIT]", url: "https://sruthik2016.pythonanywhere.com", blank: true },
    { label: "PHONE NODE", val: "+91 73735 22116", btn: "[→ DIAL]", url: "tel:+917373522116", blank: false },
    { label: "LOCATION NODE", val: "Madurai / Chennai · Tamil Nadu, India", btn: "", url: null, blank: false }
  ];
</script>

<section id="contact" class="contact-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">▸ 07 // ESTABLISH CONNECTION</h2>
    <div class="header-line"></div>
  </header>

  <div class="contact-grid">
    <!-- LEFT: Traceroute Panel -->
    <div class="panel trace-panel reveal-item fade-up stagger-1" use:reveal use:traceTrigger>
      <div class="panel-header">
        <span class="text-dim">TRACEROUTE TO: sruthik.issac // career_endpoint</span>
        {#if traceState === 'complete'}
          <button class="icon-btn text-cyan glow-hover" type="button" onclick={runTrace} aria-label="Re-run trace" title="RE-RUN TRACE">
            [▶ RE-RUN]
          </button>
        {/if}
      </div>

      <div class="trace-console">
        {#if traceState !== 'idle'}
          <div class="trace-line text-muted">Initiating route discovery...</div>
        {/if}

        <div class="trace-hops">
          {#each traceLines as line, i}
            {#if i < linesVisible}
              <div class="trace-line {i === traceLines.length - 1 ? 'text-green' : 'text-primary'}">
                {line.text}
              </div>
            {/if}
          {/each}
        </div>

        {#if traceState === 'running'}
          <div class="trace-cursor text-cyan">_</div>
        {/if}

        {#if traceState === 'complete'}
          <div class="trace-success border-green">
            <div class="text-green status-header">DESTINATION REACHED · CONNECTION ESTABLISHED ✓</div>
            <div class="text-dim">LATENCY: OPTIMAL · PACKET LOSS: 0%</div>
          </div>
        {/if}
      </div>

      <div class="compose-action">
        {#if !formOpen}
          <button class="action-btn text-cyan bg-cyan hover-bright" type="button" onclick={() => formOpen = true}>
            [✉ COMPOSE MESSAGE →]
          </button>
        {:else}
          <div class="compose-form panel panel--cyan">
            <div class="form-header text-dim">SECURE MAIL PROTOCOL</div>
            <input
              type="email"
              class="terminal-input"
              placeholder="REPLY_TO_ (optional)"
              bind:value={composeReplyTo}
              aria-label="Your email for reply-to"
              autocomplete="email"
            />
            <input
              type="text"
              class="terminal-input"
              placeholder="SUBJECT_"
              bind:value={composeSubject}
              aria-label="Message subject"
            />
            <textarea
              class="terminal-textarea"
              placeholder="BODY_"
              bind:value={composeBody}
              aria-label="Message body"
            ></textarea>
            <input
              type="text"
              class="hp-field"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              bind:value={honeypot}
              name="_website"
            />
            <div class="form-actions">
              <button
                class="text-muted hover-bright"
                type="button"
                onclick={() => { formOpen = false; submitState = 'idle'; errorMsg = ''; }}
                disabled={submitState === 'sending'}
              >[CANCEL]</button>
              <button
                class="text-green hover-bright"
                type="button"
                onclick={sendMessage}
                disabled={submitState === 'sending' || submitState === 'sent'}
              >[SEND PAYLOAD]</button>
            </div>
            {#if submitState === 'sending'}
              <div class="form-status text-cyan">▸ TRANSMITTING<span class="trace-cursor">_</span></div>
            {:else if submitState === 'sent'}
              <div class="form-status text-green">✓ PAYLOAD DELIVERED · CONNECTION CLOSING</div>
            {:else if submitState === 'error'}
              <div class="form-status text-error">✗ TRANSMISSION FAILED — {errorMsg}</div>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <!-- RIGHT: Peer Node Registry -->
    <div class="panel registry-panel reveal-item fade-up stagger-2" use:reveal>
      <div class="registry-header text-dim">PEER NODE REGISTRY</div>
      
      <div class="registry-list">
        {#each peers as peer}
          <div class="peer-row">
            <span class="peer-label text-secondary">{peer.label}</span>
            <span class="peer-val text-primary">{peer.val}</span>
            
            <div class="peer-action">
              {#if peer.url}
                <a 
                  href={peer.url} 
                  target={peer.blank ? "_blank" : undefined}
                  rel={peer.blank ? "noopener noreferrer" : undefined}
                  class="peer-link text-cyan glow-hover"
                >
                  {peer.btn}
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .section-id {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--text-muted);
    letter-spacing: 0.05em;
    margin: 0;
    white-space: nowrap;
  }

  .header-line {
    flex-grow: 1;
    height: 1px;
    background: var(--border);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
  }

  /* Grid items need min-width:0 to allow shrinking below content's intrinsic
     width — otherwise long unbroken tokens like URLs force horizontal overflow. */
  .contact-grid > * {
    min-width: 0;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    margin-bottom: var(--space-4);
    min-width: 0;
  }

  .panel-header .text-dim {
    overflow-wrap: anywhere;
    min-width: 0;
  }

  .icon-btn {
    background: transparent;
    border: none;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    padding: 0;
  }

  .text-cyan { color: var(--cyan); }
  .text-green { color: var(--green); }
  .text-dim { color: var(--text-dim); }
  .text-muted { color: var(--text-muted); }
  .text-primary { color: var(--text-primary); }
  .text-secondary { color: var(--text-secondary); }

  .bg-cyan {
    background: var(--cyan-glow);
    border: 1px solid var(--cyan-border);
  }

  .border-green {
    border: 1px solid var(--green-border);
    box-shadow: inset 0 0 10px var(--green-glow);
  }

  .hover-bright {
    transition: color 0.2s ease, text-shadow 0.2s ease, background 0.2s;
  }
  .hover-bright:hover {
    color: var(--text-bright);
    text-shadow: 0 0 8px currentColor;
  }

  /* Trace Console */
  .trace-panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .trace-console {
    background: var(--panel-inset);
    border: 1px solid var(--border-subtle);
    padding: var(--space-4);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    min-height: 240px;
    display: flex;
    flex-direction: column;
  }

  .trace-line {
    white-space: pre;
    line-height: 1.6;
    animation: typeIn 0.1s steps(20, end);
  }

  .trace-cursor {
    animation: blink 1s step-end infinite;
    display: inline-block;
  }

  .trace-success {
    margin-top: var(--space-4);
    padding: var(--space-3);
    animation: flashGreen 0.5s ease-out;
  }

  .status-header {
    font-weight: bold;
    margin-bottom: var(--space-1);
  }

  @keyframes typeIn {
    from { opacity: 0; transform: translateX(-5px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes flashGreen {
    0% { background: var(--green); color: var(--void); }
    100% { background: transparent; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Compose */
  .action-btn {
    width: 100%;
    padding: var(--space-3);
    font-family: var(--font-mono);
    cursor: pointer;
    letter-spacing: 0.05em;
  }

  .compose-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .form-header {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
  }

  .terminal-input, .terminal-textarea {
    background: var(--panel-inset);
    border: 1px solid var(--cyan-border);
    color: var(--cyan);
    font-family: var(--font-mono);
    font-size: 0.9rem;
    padding: var(--space-2);
    outline: none;
    width: 100%;
  }

  .terminal-input::placeholder, .terminal-textarea::placeholder {
    color: var(--text-muted);
  }

  .terminal-input:focus, .terminal-textarea:focus {
    border-color: var(--cyan);
    box-shadow: 0 0 8px var(--cyan-glow);
  }

  .terminal-textarea {
    resize: vertical;
    min-height: 80px;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
  }

  .form-actions button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }

  .form-actions button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .hp-field {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .form-status {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    letter-spacing: 0.05em;
  }

  .text-error {
    color: #ff6b6b;
  }

  /* Registry */
  .registry-panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .registry-header {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    letter-spacing: 0.05em;
  }

  .registry-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .peer-row {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr) auto;
    gap: var(--space-3);
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    border-bottom: 1px dashed var(--border-subtle);
    padding-bottom: var(--space-3);
  }

  .peer-val {
    overflow-wrap: anywhere;
    min-width: 0;
  }

  .peer-row:last-child {
    border-bottom: none;
  }

  .peer-link {
    text-decoration: none;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  @media (max-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .trace-console {
      font-size: 0.65rem;
      overflow-x: auto;
    }
  }

  @media (max-width: 600px) {
    .peer-row {
      grid-template-columns: 1fr;
      gap: var(--space-1);
    }

    .peer-action {
      margin-top: var(--space-2);
    }
  }
</style>
