<script>
  import { reveal } from '$lib/actions/scroll.js';
  import SkillsRadar from '$lib/components/SkillsRadar.svelte';

  const aboutParagraphs = [
    `Cloud & Network Engineer at HPE Networking — building on the troubleshooting-tools team, with a growing focus on agentic AI for self-driving networks.`,
    `Outside work, perpetually shipping side projects: local-LLM tooling, networking labs, and a monthly networking digest.`
  ];

  const systemInfo = [
    { key: 'OPERATOR',          value: 'Sruthik Issac' },
    { key: 'DESIGNATION',       value: 'Cloud Engineer · HPE Networking' },
    { key: 'SPECIALIZATIONS',   value: 'Network Troubleshooting · Agentic AI · Distributed Systems · Full-Stack Engineering' },
    { key: 'ORIGIN_NODE',       value: 'Madurai, Tamil Nadu, India' },
    { key: 'CURRENT_NODE',      value: 'Chennai, Tamil Nadu, India' },
    { key: 'LINKEDIN',          value: 'linkedin.com/in/sruthik-issac', link: 'https://www.linkedin.com/in/sruthik-issac/' },
    { key: 'GITHUB',            value: 'github.com/sruthik27',          link: 'https://github.com/sruthik27' },
    { key: 'PHILOSOPHY',        value: 'Build resilient systems. Keep learning. Ship things that matter.' },
    { key: 'STATUS',            value: '● ONLINE — All systems nominal. Ready for next mission', status: true },
  ];

  const techStacks = [
    {
      group: 'LANGUAGES',
      items: [
        { name: 'Go' },
        { name: 'Python' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'Java' },
        { name: 'SQL' },
        { name: 'Dart' }
      ]
    },
    {
      group: 'FRAMEWORKS',
      items: [
        { name: 'React' },
        { name: 'Node.js' },
        { name: 'Quarkus' },
        { name: 'FastAPI' },
        { name: 'Flask' },
        { name: 'LangChain' },
        { name: 'LangGraph' }
      ]
    },
    {
      group: 'DATA & MESSAGING',
      items: [
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'Redis' },
        { name: 'ArangoDB' },
        { name: 'Kafka' },
        { name: 'Temporal' },
        { name: 'GraphQL' }
      ]
    },
    {
      group: 'CLOUD & INFRA',
      items: [
        { name: 'AWS' },
        { name: 'Kubernetes' },
        { name: 'Docker' },
        { name: 'n8n' },
        { name: 'MCP' },
        { name: 'RAG' },
        { name: 'WebSocket / SSE' }
      ]
    }
  ];
</script>

<section id="about" aria-label="About / Kernel Info">
  <header class="section-header" use:reveal={{ delay: 100 }}>
    <h2 class="section-id">▸ 01 // SYSTEM OVERVIEW</h2>
    <div class="header-line"></div>
  </header>

  <div class="panel panel--cyan panel--static about-panel" use:reveal={{ delay: 200 }}>
    <div class="about-panel__header">
      <span class="about-panel__prompt">root@career_os:~$ cat ~/.about.md</span>
    </div>
    <div class="about-blurb">
      {#each aboutParagraphs as para}
        <p class="about-blurb__para">{para}</p>
      {/each}
    </div>
    <div class="about-panel__header about-panel__header--secondary">
      <span class="about-panel__prompt">root@career_os:~$ systeminfo</span>
    </div>
    <div class="about-panel__body">
      <div class="about-panel__left">
        {#each systemInfo as info, i}
          <div class="about-row">
            <span class="about-row__key">{info.key}:</span>
            <span class="about-row__value" class:about-row__value--status={info.status}>
              {#if info.link}
                <a href={info.link} target="_blank" rel="noopener noreferrer">
                  {info.value} ↗
                </a>
              {:else}
                {info.value}{#if info.status}█{/if}
              {/if}
            </span>
          </div>
        {/each}

        <div class="tech-stacks-divider"></div>

        {#each techStacks as stack}
          <div class="about-row tech-stack-row">
            <span class="about-row__key">{stack.group}:</span>
            <div class="tech-badge-container">
              {#each stack.items as tech}
                <div class="tech-badge">
                  <span class="tech-icon-marker" aria-hidden="true"></span>
                  <span>{tech.name}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <aside class="about-panel__right">
        <SkillsRadar />
      </aside>
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

  .about-panel {
    max-width: 100%;
    overflow-x: auto;
    background: linear-gradient(135deg, var(--panel) 0%, rgba(0, 212, 255, 0.05) 100%);
    background-size: 200% 200%;
    animation: panelPulseGlow 8s ease infinite alternate;
  }

  @keyframes panelPulseGlow {
    0% { background-position: 0% 50%; box-shadow: inset 0 0 10px rgba(0, 212, 255, 0); }
    100% { background-position: 100% 50%; box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.05); }
  }

  .about-panel__header {
    margin-bottom: var(--space-5);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--border-subtle);
  }

  .about-panel__header--secondary {
    margin-top: var(--space-6);
  }

  .about-blurb {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
    padding-left: var(--space-3);
    border-left: 2px solid var(--cyan);
  }

  .about-blurb__para {
    font-family: var(--font-body, 'Space Grotesk', sans-serif);
    font-size: var(--text-body);
    line-height: 1.65;
    color: var(--text-primary);
    margin: 0;
  }

  .about-panel__prompt {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    color: var(--green);
    letter-spacing: 0.04em;
    text-shadow: 0 0 8px var(--green-glow);
  }

  .about-panel__body {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-5);
    align-items: start;
  }

  .about-panel__left {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .about-panel__right {
    flex-shrink: 0;
    width: 240px;
    position: sticky;
    top: var(--space-4);
  }

  .about-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-4);
    padding: 4px 0;
    font-family: var(--font-mono);
    font-size: var(--text-body);
    line-height: 1.6;
    transition: background var(--fast) var(--ease);
  }

  .about-row:hover {
    background: var(--panel-raised);
  }

  .about-row__key {
    color: var(--cyan);
    font-weight: 500;
    letter-spacing: 0.04em;
    text-align: right;
    padding-right: var(--space-3);
    white-space: nowrap;
  }

  .about-row__value {
    color: var(--text-primary);
  }

  .about-row__value--status {
    color: var(--green);
  }

  .about-row__value a {
    color: var(--cyan);
    text-decoration: none;
    transition: color var(--fast) var(--ease);
  }

  .about-row__value a:hover {
    color: var(--text-bright);
    text-shadow: 0 0 12px var(--cyan);
  }

  /* Tech Stacks Specific UI */
  .tech-stacks-divider {
    height: 1px;
    background: var(--border-subtle);
    margin: var(--space-4) 0;
  }

  .tech-stack-row {
    align-items: center; /* keep badges centered with key text */
  }

  .tech-badge-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 2px 0;
  }

  .tech-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 212, 255, 0.05);
    border: 1px solid rgba(0, 212, 255, 0.2);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    color: var(--text-primary);
    transition: all var(--fast) var(--ease);
  }

  .tech-badge:hover {
    background: rgba(0, 212, 255, 0.15);
    border-color: var(--cyan);
    box-shadow: 0 0 10px var(--cyan-glow);
    transform: translateY(-2px);
  }

  .tech-icon-marker {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan-glow);
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .about-panel__body {
      grid-template-columns: 1fr;
    }
    .about-panel__right {
      width: 100%;
      position: static;
      max-width: 320px;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    .about-row {
      grid-template-columns: 1fr;
      gap: 2px;
      align-items: start;
    }
    .about-row__key {
      text-align: left;
      padding-right: 0;
      margin-bottom: 4px;
    }
    .tech-stacks-divider {
      margin: var(--space-5) 0;
    }
  }
</style>
