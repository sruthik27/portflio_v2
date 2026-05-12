<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  // Auto-fire the browser's print dialog when the page is accessed via ?print=1.
  // This is how the portfolio's Export Resume button triggers a one-click PDF flow.
  onMount(() => {
    if (page.url.searchParams.has('print')) {
      const fonts = document.fonts?.ready ?? Promise.resolve();
      fonts.then(() => setTimeout(() => window.print(), 300));
    }
  });

  function manualPrint() {
    window.print();
  }
</script>

<svelte:head>
  <title>Sruthik Issac — Resume</title>
  <meta name="description" content="Sruthik Issac — Cloud & Network Engineer. Resume." />
  <meta name="robots" content="noindex" />
</svelte:head>

<!-- Screen-only toolbar; hidden in print via @media print. -->
<div class="resume-toolbar">
  <a class="toolbar-link" href="/">← Back to portfolio</a>
  <button class="toolbar-btn" type="button" onclick={manualPrint}>↓ Download PDF</button>
</div>

<article class="resume" aria-label="Resume of Sruthik Issac">
  <header class="resume__header">
    <h1 class="resume__name">SRUTHIK ISSAC</h1>
    <p class="resume__title">Cloud &amp; Network Engineer</p>
    <p class="resume__contact">
      Chennai, India
      <span class="sep">·</span>
      <a href="mailto:sruthik2016@gmail.com">sruthik2016@gmail.com</a>
      <span class="sep">·</span>
      <a href="tel:+917373522116">+91 73735 22116</a>
      <span class="sep">·</span>
      <a href="https://www.linkedin.com/in/sruthik-issac/" target="_blank" rel="noopener noreferrer">linkedin.com/in/sruthik-issac</a>
      <span class="sep">·</span>
      <a href="https://github.com/sruthik27" target="_blank" rel="noopener noreferrer">github.com/sruthik27</a>
    </p>
  </header>

  <!-- 2-column body: Experience + Projects (left, wider) | Edu + Skills + Certs (right) -->
  <div class="resume__grid">
    <div class="resume__col resume__col--main">
      <section class="resume__section">
        <h2 class="resume__h2">Experience</h2>

        <div class="resume__job">
          <div class="resume__job-head">
            <span class="resume__company">Hewlett Packard Enterprise</span>
            <span class="resume__meta">Chennai, India · Feb 2024 – Present</span>
          </div>

          <div class="resume__role-block">
            <div class="resume__role-head">
              <span class="resume__role">Cloud Engineer · HPE Networking</span>
              <span class="resume__meta">Sep 2024 – Present</span>
            </div>
            <ul class="resume__bullets">
              <li>Re-architected a core diagnostics tool — shipped a live, in-browser interactive console end-to-end.</li>
              <li>Solo-built a major catalog &amp; execution feature with a fault-tolerant scheduler and persisted state.</li>
              <li>Designed an aggregated typed-API layer unifying many internal endpoints — auth, schema validation, structured parsing.</li>
              <li>Owned a packet-level capture pipeline — roaming-scenario discovery, artifact assembly, object-store upload.</li>
              <li>Built a CPU-only hybrid retrieval engine over a structured command catalog. Search by intent, not syntax.</li>
              <li>Leading agentic AI tooling for network troubleshooting under a self-driving-networks initiative.</li>
            </ul>
          </div>

          <div class="resume__role-block">
            <div class="resume__role-head">
              <span class="resume__role">Cloud Developer Intern · HPE Networking</span>
              <span class="resume__meta">Feb 2024 – Aug 2024</span>
            </div>
            <ul class="resume__bullets">
              <li>Built session-management infrastructure — persistence, search/filter, probabilistic uniqueness check at scale.</li>
              <li>Shipped UI for the test-execution surface — connectivity / latency / throughput widgets with live-update plumbing.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="resume__section">
        <h2 class="resume__h2">Selected Projects</h2>
        <ul class="resume__projects">
          <li>
            <span class="proj-name">Marginalia</span> — Local-first desktop reader; books → takeaways, summaries, audio. On-device via local LLMs. <span class="proj-link">marginalia-desktop.vercel.app</span>
          </li>
          <li>
            <span class="proj-name">Plexus</span> — Citation-first WiFi troubleshooting RAG assistant. Hybrid graph retrieval over vector + lexical + graph indices. <span class="proj-link">app.plexus.pw/chat</span>
          </li>
          <li>
            <span class="proj-name">Etherlab</span> — Terminal-native networking labs on Containerlab. LAG/STP scenarios, fault injection, capture/decode workflows. <span class="proj-link">github.com/sruthik27/etherlab</span>
          </li>
          <li>
            <span class="proj-name">YouBar</span> — macOS menu-bar YouTube Music controller. Search, library, visualiser, ad blocking, media-key support. <span class="proj-link">github.com/sruthik27/youbar</span>
          </li>
        </ul>
      </section>
    </div>

    <aside class="resume__col resume__col--side">
      <section class="resume__section">
        <h2 class="resume__h2">Education</h2>
        <div class="resume__edu">
          <div class="edu-school"><strong>Thiagarajar College of Engineering</strong></div>
          <div class="edu-degree">B.E. Electronics &amp; Communications</div>
          <div class="edu-meta">Madurai, India</div>
          <div class="edu-meta">Nov 2020 – Jun 2024</div>
          <div class="edu-meta"><strong>CGPA:</strong> 9.0 / 10</div>
        </div>
      </section>

      <section class="resume__section">
        <h2 class="resume__h2">Skills</h2>
        <dl class="resume__skills">
          <dt>Languages</dt><dd>Go, Python, JS / TS, Java, SQL</dd>
          <dt>Cloud</dt><dd>AWS, Kubernetes, Docker, Azure</dd>
          <dt>Frameworks</dt><dd>React, Quarkus, FastAPI, LangChain, LangGraph</dd>
          <dt>Data</dt><dd>PostgreSQL, MongoDB, ArangoDB, Redis, Kafka, Temporal</dd>
          <dt>AI</dt><dd>RAG, Agents, Prompt Eng., MCP, Local LLMs</dd>
          <dt>Networking</dt><dd>CCNA, WiFi, Cybersecurity, Packet Analysis</dd>
        </dl>
      </section>

      <section class="resume__section">
        <h2 class="resume__h2">Certifications &nbsp;<span class="resume__h2-sub">(33 total)</span></h2>
        <ul class="resume__certs">
          <li>AWS Solutions Architect — Associate · 2024</li>
          <li>AWS Certified AI Practitioner · 2025</li>
          <li>Cisco CCNA · 2026 (renewed)</li>
          <li>LangChain Essentials · 2026</li>
          <li>ArangoDB Certified Professional · 2024</li>
          <li>GraphQL Developer Associate (Apollo) · 2024</li>
        </ul>
      </section>
    </aside>
  </div>
</article>

<style>
  :global(body.mode-standalone) {
    background: #f3f4f6;
    color: #111;
  }

  /* ── Screen-only toolbar ── */
  .resume-toolbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    background: #1a1a1a;
    color: #fff;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 13px;
    border-bottom: 1px solid #333;
  }

  .toolbar-link,
  .toolbar-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    text-decoration: none;
    font: inherit;
    padding: 6px 14px;
    border-radius: 2px;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: background 0.15s, border-color 0.15s;
  }

  .toolbar-link:hover,
  .toolbar-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.7);
  }

  /* ── Resume document ── */
  .resume {
    background: #fff;
    color: #111;
    width: 8.27in;          /* A4 width */
    max-width: 100%;
    margin: 32px auto;
    padding: 0.3in 0.4in;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 9pt;
    line-height: 1.28;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .resume__header {
    text-align: center;
    border-bottom: 1.5px solid #111;
    padding-bottom: 3pt;
    margin-bottom: 5pt;
  }

  .resume__name {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: 1.5pt;
    margin: 0 0 1pt 0;
    color: #000;
  }

  .resume__title {
    font-size: 10.5pt;
    color: #444;
    margin: 0 0 3pt 0;
    font-weight: 500;
    letter-spacing: 0.5pt;
  }

  .resume__contact {
    font-size: 8.5pt;
    color: #333;
    margin: 0;
    line-height: 1.4;
  }

  .resume__contact a {
    color: #333;
    text-decoration: none;
  }

  .resume__contact a:hover { text-decoration: underline; }

  .resume__contact .sep {
    color: #aaa;
    margin: 0 4pt;
  }

  /* ── Sections ── */
  .resume__section {
    margin-top: 4pt;
  }
  .resume__col .resume__section:first-child {
    margin-top: 0;
  }

  .resume__h2 {
    font-size: 9pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2pt;
    color: #000;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1.5pt;
    margin: 0 0 3pt 0;
  }

  .resume__h2-sub {
    font-size: 7.5pt;
    color: #777;
    font-weight: 400;
    letter-spacing: 0.4pt;
    text-transform: none;
  }

  /* ── Job / Role blocks ── */
  .resume__job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12pt;
    margin: 0 0 1pt 0;
  }

  .resume__company {
    font-weight: 700;
    color: #000;
    font-size: 10pt;
    letter-spacing: 0.2pt;
  }

  .resume__meta {
    font-size: 8.5pt;
    color: #555;
    white-space: nowrap;
  }

  .resume__role-block {
    margin-top: 2pt;
  }

  .resume__role-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12pt;
    margin-bottom: 0.5pt;
  }

  .resume__role {
    font-style: italic;
    color: #222;
    font-weight: 500;
    font-size: 9pt;
  }

  /* ── Bullet lists ── */
  .resume__bullets,
  .resume__projects,
  .resume__certs {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .resume__bullets li,
  .resume__projects li,
  .resume__certs li {
    position: relative;
    padding-left: 9pt;
    margin: 0.5pt 0;
    line-height: 1.28;
    color: #222;
  }

  .resume__bullets li::before,
  .resume__projects li::before,
  .resume__certs li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #888;
    font-weight: 700;
  }

  /* ── 2-column grid for projects + sidebar ── */
  .resume__grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 18pt;
    margin-top: 6pt;
  }

  .resume__col--main .resume__section,
  .resume__col--side .resume__section {
    margin-top: 0;
  }

  .resume__col--side .resume__section + .resume__section {
    margin-top: 4pt;
  }

  /* ── Projects ── */
  .resume__projects li {
    margin: 2pt 0;
  }

  .proj-name {
    font-weight: 700;
    color: #000;
  }

  .proj-link {
    color: #666;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 7.8pt;
    margin-top: 1pt;
    margin-left: 0;
  }

  /* ── Education ── */
  .resume__edu {
    font-size: 8.5pt;
    line-height: 1.4;
  }

  .edu-school {
    font-size: 9pt;
    color: #000;
  }

  .edu-degree {
    color: #333;
  }

  .edu-meta {
    color: #555;
    font-size: 8.2pt;
  }

  /* ── Skills (sidebar — denser) ── */
  .resume__skills {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 8pt;
    row-gap: 1pt;
    margin: 0;
    font-size: 8.5pt;
  }

  .resume__skills dt {
    font-weight: 700;
    color: #000;
    white-space: nowrap;
  }

  .resume__skills dd {
    margin: 0;
    color: #222;
  }

  /* ── Certs (sidebar single column) ── */
  .resume__certs li {
    font-size: 8.5pt;
    margin: 1pt 0;
  }

  /* ── Print rules ── */
  @media print {
    :global(body) {
      background: #fff !important;
    }

    .resume-toolbar {
      display: none !important;
    }

    .resume {
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0.28in 0.38in;
      box-shadow: none;
    }

    @page {
      size: A4;
      margin: 0;
    }

    .resume__contact a {
      color: #111;
      text-decoration: none;
    }
  }

  /* ── Responsive screen viewing only (print stays 2-column at A4 size) ── */
  @media only screen and (max-width: 720px) {
    .resume {
      width: 100%;
      margin: 0;
      padding: 24px;
      box-shadow: none;
    }

    .resume__grid {
      grid-template-columns: 1fr;
    }

    .resume__job-head,
    .resume__role-head {
      flex-direction: column;
      gap: 0;
    }

    .resume__meta {
      white-space: normal;
    }
  }
</style>
