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

  const projects = [
    {
      id: 1,
      name: "SyncRoom",
      year: "2024",
      status: "LIVE",
      desc: "Real-time collaborative music platform. Create rooms, sync audio with friends live.",
      url: "https://syncroomnow.com",
      githubUrl: "https://github.com/sk/syncroom",
      icon: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />',
      accent: "cyan",
      tech: ['WebRTC', 'SvelteKit', 'Node.js']
    },
    {
      id: 2,
      name: "SkyNotes",
      year: "2025",
      status: "LIVE",
      desc: "Chrome extension — floating sticky notes per webpage",
      url: "https://skynotes.app",
      githubUrl: "https://github.com/sk/skynotes",
      icon: '<path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" /><path d="M15 3v5a1 1 0 0 0 1 1h5" />',
      accent: "green",
      tech: ['Chrome API', 'React', 'Firebase']
    },
    {
      id: 3,
      name: "CTM",
      year: "2024",
      status: "ARCHIVED",
      desc: "CLI task manager — lightweight terminal todo tool",
      url: null,
      githubUrl: "https://github.com/sk/ctm",
      icon: '<path d="M12 19h8" /><path d="m4 17 6-6-6-6" />',
      accent: "border-subtle",
      tech: ['Go', 'Cobra', 'SQLite']
    },
    {
      id: 4,
      name: "Stylo",
      year: "2023",
      status: "LIVE",
      desc: "Browser extension — customize Google Search & ChatGPT UI",
      url: "https://stylo.pkg.com",
      githubUrl: "https://github.com/sk/stylo",
      icon: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />',
      accent: "green",
      tech: ['Manifest V3', 'CSS', 'JS']
    },
    {
      id: 5,
      name: "MixnMatch",
      year: "2023",
      status: "ARCHIVED",
      desc: "UI color tool — AI-powered foreground/background combinations with WCAG scoring",
      url: null,
      githubUrl: "https://github.com/sk/mixnmatch",
      icon: '<path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" /><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" /><path d="m2 22 .414-.414" />',
      accent: "border-subtle",
      tech: ['React', 'OpenAI API' ]
    },
    {
      id: 6,
      name: "Care In Cure",
      year: "2023",
      status: "ARCHIVED",
      desc: "Health platform — library of ailments, home remedies, community contributions",
      url: null,
      githubUrl: "https://github.com/sk/care-in-cure",
      icon: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />',
      accent: "border-subtle",
      tech: ['MongoDB', 'Express', 'Angular']
    },
    {
      id: 7,
      name: "Passcheck",
      year: "2019",
      status: "ARCHIVED",
      desc: "Password security tool — checks against known data breach lists",
      url: null,
      githubUrl: "https://github.com/sk/passcheck",
      icon: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />',
      accent: "border-subtle",
      tech: ['Python', 'HIBP API']
    },
    {
      id: 8,
      name: "Spectrum Split",
      year: "2023",
      status: "ARCHIVED",
      desc: "PDF utility — splits B&W and color pages into separate PDFs",
      url: null,
      githubUrl: "https://github.com/sk/spectrum-split",
      icon: '<circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12" /><path d="M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" />',
      accent: "border-subtle",
      tech: ['Python', 'PyPDF2', 'OpenCV']
    },
    {
      id: 9,
      name: "Funtopia",
      year: "2021",
      status: "ARCHIVED",
      desc: "WhatsApp sticker app — classic cartoon nostalgia sticker packs",
      url: null,
      githubUrl: "https://github.com/sk/funtopia",
      icon: '<path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" /><path d="M15 3v5a1 1 0 0 0 1 1h5" /><path d="M8 13h.01" /><path d="M16 13h.01" /><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />',
      accent: "border-subtle",
      tech: ['Flutter', 'Dart']
    }
  ];
</script>

<section id="projects" class="projects-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">§ 04 // DEPLOYMENT REGISTRY</h2>
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
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="btn-action" title="View GitHub Repository">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              SOURCE
            </a>
            {#if project.status === 'LIVE' && project.url}
              <a href={project.url} target="_blank" rel="noopener noreferrer" class="btn-action live" title="View Live Deploy">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                LAUNCH
              </a>
            {:else}
              <button class="btn-action archived" disabled title="Project is currently archived/offline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M4.929 4.929 19.07 19.071" /></svg>
                OFFLINE
              </button>
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
  }

  .project-card:hover {
    transform: translateY(-3px);
  }

  /* Utility classes mapped from variables */
  .text-green { color: var(--green); }
  .text-muted { color: var(--text-muted); }
  .text-dim { color: var(--text-dim); }
  .text-bright { color: var(--text-bright); }
  .text-primary { color: var(--text-primary); }

  .border-green { border: 1px solid var(--green-border); background: var(--green-glow); }
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
