<script>
  import { reveal } from '$lib/actions/scroll.js';
  
  const systemInfo = [
    { key: 'OPERATOR',          value: 'Sruthik Issac' },
    { key: 'DESIGNATION',       value: 'Cloud Engineer — Aruba Networks, Hewlett Packard Enterprise' },
    { key: 'SPECIALIZATIONS',   value: 'Cloud Architecture · Full-Stack Dev · AI Agents · Networking Solutions' },
    { key: 'ORIGIN_NODE',       value: 'Madurai, Tamil Nadu, India' },
    { key: 'CURRENT_NODE',      value: 'Chennai, Tamil Nadu, India' },
    { key: 'LINKEDIN',          value: 'linkedin.com/in/sruthik-issac-5b9119198', link: 'https://www.linkedin.com/in/sruthik-issac-5b9119198/' },
    { key: 'PHILOSOPHY',        value: 'Build resilient systems. Keep learning. Ship things that matter.' },
    { key: 'STATUS',            value: '● ONLINE — All systems nominal. Ready for next mission', status: true },
  ];

  const techStacks = [
    {
      group: 'LANGUAGES',
      items: [
        { name: 'Python', icon: 'python' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Go', icon: 'go' },
        { name: 'Java', icon: 'openjdk' },
        { name: 'C', icon: 'c' },
        { name: 'C#', icon: 'csharp' },
        { name: 'SQL', icon: 'mysql' },
        { name: 'Dart', icon: 'dart' }
      ]
    },
    {
      group: 'FRAMEWORKS',
      items: [
        { name: 'React', icon: 'react' },
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'Django', icon: 'django' },
        { name: 'Flask', icon: 'flask' },
        { name: 'Quarkus', icon: 'quarkus' },
        { name: 'ASP.NET', icon: 'dotnet' },
        { name: 'LangChain', icon: 'langchain' }
      ]
    },
    {
      group: 'DATABASES',
      items: [
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Redis', icon: 'redis' },
        { name: 'ArangoDB', icon: 'arangodb' },
        { name: 'ClickHouse', icon: 'clickhouse' }
      ]
    }
  ];
</script>

<section id="about" aria-label="About / Kernel Info">
  <div class="section-tag" use:reveal={{ delay: 100 }}>§ 01 // SYSTEM OVERVIEW</div>

  <div class="panel panel--cyan about-panel" use:reveal={{ delay: 200 }}>
    <div class="about-panel__header">
      <span class="about-panel__prompt">root@career_os:~$ systeminfo</span>
    </div>
    <div class="about-panel__body">
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
  </div>
</section>

<style>
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

  .about-panel__prompt {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    color: var(--green);
    letter-spacing: 0.04em;
    text-shadow: 0 0 8px var(--green-glow);
  }

  .about-panel__body {
    display: flex;
    flex-direction: column;
    gap: 2px;
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
