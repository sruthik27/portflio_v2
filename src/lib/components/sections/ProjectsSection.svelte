<script>
  import { reveal } from '$lib/actions/scroll.js';
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';

  let techTick = $state(0);

  onMount(() => {
    const interval = setInterval(() => {
      techTick++;
    }, 2500); // Rotate tech every 2.5 seconds
    return () => clearInterval(interval);
  });

  // Source of truth: linkedin.com/in/sruthik-issac/details/projects/ + GitHub READMEs (sruthik27).
  // Listed newest first.
  const projects = [
    {
      id: 1,
      name: "Marginalia",
      year: "2026",
      status: "BETA",
      desc: "Local-first desktop reader that distills books into takeaways, quotes, summaries, plot chronicles, and audio — all on-device via Ollama. Free, MIT-licensed.",
      url: "https://marginalia-desktop.vercel.app/",
      githubUrl: "https://github.com/sruthik27/marginalia-desktop",
      icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
      accent: "cyan",
      tech: ['Python', 'FastAPI', 'Ollama', 'Electron', 'RAG']
    },
    {
      id: 2,
      name: "Plexus",
      year: "2026",
      status: "BETA",
      desc: "Citation-first WiFi troubleshooting RAG assistant. Hybrid Graph RAG over Qdrant, SQLite FTS, and Neo4j — evidence-grounded answers and root-cause expansion.",
      url: "https://app.plexus.pw/chat",
      githubUrl: null,
      icon: '<circle cx="12" cy="12" r="3"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="m5.6 5.6 1.4 1.4"/><path d="m17 17 1.4 1.4"/><path d="m5.6 18.4 1.4-1.4"/><path d="m17 7 1.4-1.4"/>',
      accent: "cyan",
      tech: ['LLM', 'Qdrant', 'Neo4j', 'SQLite FTS', 'WiFi']
    },
    {
      id: 3,
      name: "YouBar",
      year: "2026",
      status: "LIVE",
      desc: "Mac menu bar YouTube Music controller — search, library, visualizer, ad blocking, media-key support. Universal Apple Silicon + Intel build.",
      url: "https://github.com/sruthik27/youbar/releases/latest",
      githubUrl: "https://github.com/sruthik27/youbar",
      icon: '<rect width="20" height="15" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
      accent: "green",
      tech: ['Electron 30', 'Web Audio API', 'JavaScript', 'macOS']
    },
    {
      id: 4,
      name: "NovaRead",
      year: "2026",
      status: "LIVE",
      desc: "Premium speed-reading extension using RSVP & ORP technology. Web articles, PDF, TXT support with Focus Audio and a privacy-first design.",
      url: "https://chromewebstore.google.com/detail/novaread/mgenomcilldfgkmmomlodknaoklanbhl",
      githubUrl: "https://github.com/sruthik27/nova-read",
      icon: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><path d="m18 7-3 5 3 5"/>',
      accent: "green",
      tech: ['JavaScript', 'Chrome MV3', 'Readability', 'RSVP/ORP']
    },
    {
      id: 5,
      name: "EtherLab",
      year: "2026",
      status: "LIVE",
      desc: "Terminal-native networking labs built on Containerlab with a unified `ethl` CLI. LAG and STP scenarios on Cisco IOL — fault injection, captures, parsed logs.",
      url: "https://github.com/sruthik27/etherlab",
      githubUrl: "https://github.com/sruthik27/etherlab",
      icon: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>',
      accent: "green",
      tech: ['Containerlab', 'Docker', 'Cisco IOL', 'Python', 'Shell']
    },
    {
      id: 6,
      name: "Local Email Summariser",
      year: "2026",
      status: "LIVE",
      desc: "Privacy-first n8n workflow. IMAP fetch, regex pre-filter, Ollama-LLM summary, daily delivery via Ntfy + Telegram. Zero cloud LLM calls.",
      url: "https://github.com/sruthik27/n8n-local-daily-email-summariser",
      githubUrl: "https://github.com/sruthik27/n8n-local-daily-email-summariser",
      icon: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
      accent: "green",
      tech: ['n8n', 'Ollama', 'Python', 'IMAP']
    },
    {
      id: 7,
      name: "SkyNotes",
      year: "2025",
      status: "LIVE",
      desc: "Chrome extension for floating sticky notes tied to specific webpages. Multi-note per page, customizable colors, browser-local storage.",
      url: "https://chromewebstore.google.com/detail/skynotes-floating-sticky/eigopjegdhcfcidmpgkfofnfjamdhmjg",
      githubUrl: "https://github.com/sruthik27/SkyNotes",
      icon: '<path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/>',
      accent: "green",
      tech: ['React', 'Tailwind', 'Chrome API']
    },
    {
      id: 8,
      name: "SyncRoom",
      year: "2024",
      status: "LIVE",
      desc: "Real-time collaborative music listening platform. Create rooms, queue songs, and stay perfectly in sync with friends across the globe — fully on AWS.",
      url: "https://dsl64nu44inmi.cloudfront.net",
      githubUrl: "https://github.com/sruthik27/SyncRoom",
      icon: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
      accent: "green",
      tech: ['React', 'AWS', 'Node.js', 'Tailwind']
    },
    {
      id: 9,
      name: "CTM",
      year: "2024",
      status: "LIVE",
      desc: "Cross-platform CLI task manager. Add, complete, prioritize, list, and archive tasks. Background reminders for stale tasks. macOS / Linux / Windows.",
      url: "https://github.com/sruthik27/ctm",
      githubUrl: "https://github.com/sruthik27/ctm",
      icon: '<path d="M12 19h8"/><path d="m4 17 6-6-6-6"/>',
      accent: "green",
      tech: ['Go', 'CLI', 'Cross-platform']
    },
    {
      id: 10,
      name: "Stylo",
      year: "2023",
      status: "LIVE",
      desc: "Browser extension to customize Google Search and ChatGPT UI — colors, fonts, with bright and dark mode presets.",
      url: "https://chromewebstore.google.com/detail/stylo-custom-color-font-f/mhcmipkcglgenipcjjhhfcndlgdmfccd",
      githubUrl: null,
      icon: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
      accent: "green",
      tech: ['JavaScript', 'Manifest V3', 'CSS']
    },
    {
      id: 11,
      name: "Mixnmatch",
      year: "2023",
      status: "LIVE",
      desc: "UI color-combination playground with AI recommendations and WCAG contrast scoring for accessible design palettes.",
      url: "https://sruthik27.github.io/mixnmatch-v2/",
      githubUrl: "https://github.com/sruthik27/mixnmatch-v2",
      icon: '<path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"/><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z"/>',
      accent: "green",
      tech: ['React', 'TypeScript', 'OpenAI API', 'WCAG']
    },
    {
      id: 12,
      name: "Care In Cure",
      year: "2023",
      status: "LIVE",
      desc: "Wellness companion with health concerns library, home remedies, tools, and community-contributed remedies.",
      url: "https://cureincare.onrender.com/",
      githubUrl: null,
      icon: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
      accent: "green",
      tech: ['JavaScript', 'PostgreSQL', 'Express', 'React']
    },
    {
      id: 13,
      name: "Spectrum Split",
      year: "2023",
      status: "LIVE",
      desc: "Splits black-and-white pages and color pages into separate PDFs for cost-efficient printing. Web app + Android companion.",
      url: "https://pdf-splitter-v2.onrender.com/",
      githubUrl: "https://github.com/sruthik27/spectrum-split",
      icon: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
      accent: "green",
      tech: ['Python', 'Flask', 'Flutter', 'PyPDF']
    },
    {
      id: 14,
      name: "Funtopia",
      year: "2021",
      status: "LIVE",
      desc: "WhatsApp sticker app with animated and cartoon nostalgia sticker packs. Published on Google Play.",
      url: "https://play.google.com/store/apps/details?id=com.funtopia.stickers&hl=en_IN",
      githubUrl: null,
      icon: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
      accent: "green",
      tech: ['Flutter', 'Dart', 'Android']
    },
    {
      id: 15,
      name: "Passcheck",
      year: "2019",
      status: "LIVE",
      desc: "Password security checker — verifies whether a password has appeared in a known data leak list. First side project, still online.",
      url: "https://sruthik2016.pythonanywhere.com/Passc.html",
      githubUrl: null,
      icon: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
      accent: "border-subtle",
      tech: ['Python', 'Flask', 'HIBP API']
    }
  ];
</script>

<section id="projects" class="projects-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">▸ 04 // DEPLOYMENT REGISTRY</h2>
    <div class="header-line"></div>
  </header>

  <div class="projects-grid">
    {#each projects as project}
      <div 
        class="panel project-card {project.accent === 'cyan' ? 'panel--cyan' : project.accent === 'green' ? 'panel--green' : ''} reveal-item fade-up stagger-1" 
        use:reveal
      >
        <div class="card-header">
          <div class="header-left">
            <span class="project-id text-muted">DP-{String(project.id).padStart(3, '0')}</span>
            <div class="tags">
              {#if project.status === 'LIVE'}
                <span class="tag text-green border-green">● {project.status}</span>
              {:else if project.status === 'BETA'}
                <span class="tag text-cyan border-cyan">◐ {project.status}</span>
              {:else}
                <span class="tag text-muted border-subtle">✓ {project.status}</span>
              {/if}
            </div>
          </div>
          <span class="project-year text-dim">{project.year}</span>
        </div>

        <div class="card-body">
          <div class="project-title-area">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="project-icon" style="color: {project.status === 'LIVE' ? (project.featured ? 'var(--cyan)' : 'var(--green)') : 'var(--text-muted)'}; margin-right: 12px;">
              {@html project.icon}
            </svg>
            <h3 class="project-name text-bright glow-hover">{project.name}</h3>
          </div>
          <p class="project-desc text-primary">{project.desc}</p>
        </div>

        <div class="card-footer">
          <div class="action-buttons">
            {#if project.githubUrl}
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="btn-action" title="View GitHub Repository">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                SOURCE
              </a>
            {:else}
              <button class="btn-action archived" disabled title="Source is private or not on GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                PRIVATE
              </button>
            {/if}
            {#if project.url}
              <a href={project.url} target="_blank" rel="noopener noreferrer" class="btn-action live" title="View Live Deploy">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                LAUNCH
              </a>
            {/if}
          </div>
          <div class="tech-stack-container">
             {#key techTick % project.tech.length}
               <span
                 class="tech-node"
                 in:fly={{ y: 10, duration: 400, delay: 200 }}
                 out:fly={{ y: -10, duration: 400 }}
               >
                 {project.tech[techTick % project.tech.length]}
               </span>
             {/key}
          </div>
        </div>

        <!-- UPGRADE 07: Terminal deploy hover overlay -->
        <div class="deploy-terminal" aria-hidden="true">
          <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">git pull origin main</span></div>
          <div class="term-line"><span class="term-ok">[OK]</span> <span class="term-out">fetched {project.tech[0]} project</span></div>
          <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">build --target={project.tech[1] || 'prod'}</span></div>
          <div class="term-line"><span class="term-ok">[OK]</span> <span class="term-out">compiled in 3.2s</span></div>
          <div class="term-line"><span class="term-prompt">$</span> <span class="term-cmd">deploy {project.name.toLowerCase()}</span></div>
          {#if project.url}
            <div class="term-line"><span class="term-ok">[OK]</span> <span class="term-success">{project.url.replace(/^https?:\/\//, '').slice(0, 48)}{project.url.replace(/^https?:\/\//, '').length > 48 ? '…' : ''} · {project.status}</span><span class="term-cursor"></span></div>
          {:else}
            <div class="term-line"><span class="term-dim">[--]</span> <span class="term-out">no live deploy · source only</span><span class="term-cursor"></span></div>
          {/if}
        </div>
      </div>
    {/each}
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

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-4);
  }

  .project-card {
    display: flex;
    flex-direction: column;
    color: inherit;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .project-card:hover {
    transform: translateY(-3px);
  }

  /* ── UPGRADE 07: Terminal deploy overlay ──
     Overlay sits above the card-header + card-body only, so the footer
     (SOURCE / LAUNCH CTAs and tech chip) remains visible and clickable. */
  .card-header,
  .card-body {
    transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
  }

  .deploy-terminal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 49px; /* leave footer visible (min-height: 48px + 1px border) */
    padding: 18px 18px 12px;
    background: rgba(2, 4, 10, 0.96);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.7;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
    pointer-events: none;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 2;
  }

  .project-card:hover .deploy-terminal {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card:hover .card-header,
  .project-card:hover .card-body {
    opacity: 0;
    transform: translateY(-6px);
  }

  .term-line {
    color: var(--text-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .term-prompt { color: var(--cyan); margin-right: 4px; }
  .term-cmd    { color: var(--text-primary); }
  .term-out    { color: var(--text-secondary); }
  .term-ok     { color: var(--green); margin-right: 4px; }
  .term-dim    { color: var(--text-muted); margin-right: 4px; }
  .term-success { color: var(--green); }

  .term-cursor {
    display: inline-block;
    width: 7px;
    height: 11px;
    background: var(--cyan);
    margin-left: 6px;
    vertical-align: text-bottom;
    animation: term-blink 1s step-end infinite;
  }

  @keyframes term-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .term-cursor { animation: none; }
    .project-card:hover .deploy-terminal { transition: opacity 0.1s; }
  }

  /* Touch devices don't have hover — keep cards normal, never flip */
  @media (hover: none) {
    .deploy-terminal { display: none; }
  }

  /* Utility classes mapped from variables */
  .text-green { color: var(--green); }
  .text-cyan { color: var(--cyan); }
  .text-muted { color: var(--text-muted); }
  .text-dim { color: var(--text-dim); }
  .text-bright { color: var(--text-bright); }
  .text-primary { color: var(--text-primary); }

  .border-green { border: 1px solid var(--green-border); background: var(--green-glow); }
  .border-cyan { border: 1px solid var(--cyan-border); background: var(--cyan-glow); }
  .border-subtle { border: 1px solid var(--border-subtle); }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--space-3);
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .project-id {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
  }

  .tags {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 2px;
    letter-spacing: 0.05em;
    font-weight: bold;
  }

  .project-year {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
  }

  .card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .project-title-area {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-2);
  }

  .project-name {
    font-family: var(--font-display);
    font-size: 1.35rem;
    margin: 0;
    letter-spacing: 0.05em;
  }

  .project-desc {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid var(--border-subtle);
    padding-top: var(--space-3);
    min-height: 48px;
  }

  .action-buttons {
    display: flex;
    gap: var(--space-2);
  }

  .btn-action {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 0.70rem;
    letter-spacing: 0.05em;
    padding: 4px 8px;
    border-radius: 2px;
    background: var(--panel-inset);
    border: 1px solid var(--border-subtle);
    color: var(--text-dim);
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .btn-action:hover:not(:disabled) {
    border-color: var(--text-muted);
    color: var(--text-primary);
  }

  .btn-action.live {
    color: var(--green);
    border-color: var(--green-border);
    background: var(--green-glow);
  }

  .btn-action.live:hover {
    border-color: var(--green);
    box-shadow: 0 0 10px var(--green-glow);
  }

  .btn-action.archived {
    background: transparent;
    border: 1px dashed var(--border-subtle);
    color: var(--text-muted);
    cursor: not-allowed;
  }

  .tech-stack-container {
    display: grid;
    place-items: center end;
    min-width: 80px;
    height: 24px;
    flex: 1;
    padding-left: 12px;
  }

  .tech-node {
    grid-area: 1 / 1;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    padding: 2px 6px;
    border: 1px solid var(--border-subtle);
    border-radius: 2px;
    letter-spacing: 0.05em;
    background: rgba(0, 0, 0, 0.2);
    animation: techPulse 3s infinite;
  }

  @keyframes techPulse {
    0%, 100% {
      border-color: var(--border-subtle);
      color: var(--text-muted);
      box-shadow: none;
    }
    50% {
      border-color: var(--cyan);
      color: var(--cyan);
      box-shadow: 0 0 8px rgba(0, 255, 255, 0.2);
    }
  }
</style>
