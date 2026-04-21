<script>
  import { reveal } from '$lib/actions/scroll.js';

  const clusters = [
    {
      title: '☁ CLOUD & INFRASTRUCTURE',
      accent: 'green',
      skills: [
        { name: '● AWS (Solutions Architect SAA-C03)', level: 90, tooltip: 'Expert · Certified' },
        { name: '● HPE Aruba Networks', level: 88, tooltip: 'Expert · Current Daily Work' },
        { name: '● Kubernetes (+ HPE Ezmeral)', level: 82, tooltip: 'Expert · HPE Certified' },
        { name: '◉ Microsoft Azure (AZ-900)', level: 74, tooltip: 'Proficient · Certified' },
        { name: '◉ Serverless Architecture', level: 78, tooltip: 'Proficient · AWS Lambda' },
        { name: '◉ Solution Architecture & Design', level: 85, tooltip: 'Proficient · AWS SAA' }
      ]
    },
    {
      title: '🌐 NETWORKING & SECURITY',
      accent: 'green',
      skills: [
        { name: '● Computer Networking (CCNA)', level: 92, tooltip: 'Expert · Cisco Certified' },
        { name: '● Cybersecurity (Cisco Certified)', level: 80, tooltip: 'Expert · Cisco Certified' },
        { name: '● Ethical Hacking (Cisco Certified)', level: 78, tooltip: 'Expert · Cisco Certified' },
        { name: '◉ AI for Networking (Cisco)', level: 76, tooltip: 'Proficient · Cisco Certified' },
        { name: '◉ Network Devices & Configuration', level: 84, tooltip: 'Proficient · Cisco Certified' },
        { name: '◉ REST APIs / GraphQL', level: 86, tooltip: 'Proficient · Apollo Certified' }
      ]
    },
    {
      title: '⌨ PROGRAMMING LANGUAGES',
      accent: 'cyan',
      skills: [
        { name: '● Python', level: 92, tooltip: 'Expert · HackerRank Certified' },
        { name: '● JavaScript / TypeScript', level: 90, tooltip: 'Expert · Full-Stack Daily Use' },
        { name: '◉ Java (Concurrent + Parallel)', level: 80, tooltip: 'Proficient · Udemy Certified' },
        { name: '◉ Go (Golang)', level: 68, tooltip: 'Proficient · HackerRank Certified' },
        { name: '◉ C / C# / .NET', level: 72, tooltip: 'Proficient · HackerRank Certified' },
        { name: '◉ SQL / PL-SQL', level: 86, tooltip: 'Proficient · ZTM + HackerRank Certified' },
        { name: '▪ Dart / Flutter', level: 64, tooltip: 'Familiar · Android projects' }
      ]
    },
    {
      title: '◈ AI, DATABASES & FULL-STACK',
      accent: 'purple',
      skills: [
        { name: '● LangChain / AI Agents', level: 82, tooltip: 'Expert · LangChain Academy' },
        { name: '● AWS AI Practitioner', level: 84, tooltip: 'Expert · AWS Certified' },
        { name: '◉ React.js / Node.js', level: 88, tooltip: 'Proficient · Daily Use' },
        { name: '◉ MongoDB / ArangoDB', level: 79, tooltip: 'Proficient · Both Certified' },
        { name: '◉ Redis (Streams + Java)', level: 77, tooltip: 'Proficient · Redis Certified' },
        { name: '◉ PostgreSQL / ClickHouse', level: 80, tooltip: 'Proficient · ClickHouse Certified' },
        { name: '◉ Django / Flask / ASP.NET', level: 80, tooltip: 'Proficient · Multiple Projects' }
      ]
    }
  ];

  // Mobile tap logic + Desktop hover logic
  let activeTooltip = $state(null);

  function setActive(id) {
    activeTooltip = id;
  }

  function clearActive(id) {
    if (activeTooltip === id) {
      activeTooltip = null;
    }
  }

  function toggleActive(id, event) {
    // If it's a touch device, prevent default so it doesn't trigger click and immediately dismiss
    if (event.type === 'touchstart') {
      event.preventDefault();
      activeTooltip = activeTooltip === id ? null : id;
    }
  }
</script>

<section id="skills" class="skills-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">§ 02 // SERVICE HEALTH MONITOR</h2>
    <div class="header-line"></div>
  </header>

  <div class="clusters-grid">
    {#each clusters as cluster, cIndex}
      <div class="panel panel--{cluster.accent} cluster-card reveal-item fade-up stagger-1" use:reveal>
        <h3 class="cluster-title text-{cluster.accent}">{cluster.title}</h3>
        
        <div class="skills-list">
          {#each cluster.skills as skill, sIndex}
            {@const id = `${cIndex}-${sIndex}`}
            
            <button 
              class="skill-row"
              type="button"
              onmouseenter={() => setActive(id)}
              onmouseleave={() => clearActive(id)}
              ontouchstart={(e) => toggleActive(id, e)}
              onfocus={() => setActive(id)}
              onblur={() => clearActive(id)}
              aria-label="{skill.name}, {skill.level} percent proficiency. {skill.tooltip}"
            >
              <div class="skill-info">
                <span class="skill-name">{skill.name}</span>
                <span class="skill-level">{skill.level}%</span>
              </div>
              
              <div class="progress-track">
                <div 
                  class="progress-fill bg-{cluster.accent}" 
                  style="--target-width: {skill.level}%;"
                ></div>
              </div>

              {#if activeTooltip === id}
                <div class="tooltip border-{cluster.accent}">
                  <span class="tooltip-badge bg-{cluster.accent}">INSPECT</span>
                  {skill.tooltip}
                </div>
              {/if}
            </button>
          {/each}
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

  .clusters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-5);
  }

  .cluster-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .cluster-title {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    letter-spacing: 0.05em;
    margin: 0;
    padding-bottom: var(--space-3);
    border-bottom: 1px dashed var(--border-subtle);
  }

  /* Utility classes mapped from variables for acccents */
  .text-green { color: var(--green); }
  .text-cyan { color: var(--cyan); }
  .text-amber { color: var(--amber); }
  .text-red { color: var(--red); }
  .text-purple { color: var(--purple); }

  .bg-green { background: var(--green); box-shadow: 0 0 10px var(--green-glow); }
  .bg-cyan { background: var(--cyan); box-shadow: 0 0 10px var(--cyan-glow); }
  .bg-amber { background: var(--amber); box-shadow: 0 0 10px var(--amber-glow); }
  .bg-red { background: var(--red); box-shadow: 0 0 10px var(--red-glow); }
  .bg-purple { background: var(--purple); box-shadow: 0 0 10px var(--purple-glow); }

  .border-green { border: 1px solid var(--green-border); }
  .border-cyan { border: 1px solid var(--cyan-border); }
  .border-amber { border: 1px solid var(--amber-border); }
  .border-red { border: 1px solid var(--red-border); }
  .border-purple { border: 1px solid var(--purple-border); }

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .skill-row {
    position: relative;
    background: transparent;
    border: none;
    padding: var(--space-1) 0;
    margin: 0;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    color: inherit;
    width: 100%;
    outline: none;
  }

  .skill-row:focus-visible .skill-name {
    color: var(--text-bright);
    text-decoration: underline;
  }

  .skill-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-2);
    font-size: var(--text-micro);
    font-family: var(--font-mono);
  }

  .skill-name {
    color: var(--text-primary);
    transition: color var(--fast) var(--ease);
  }

  .skill-level {
    color: var(--text-dim);
  }

  .skill-row:hover .skill-name {
    color: var(--text-bright);
  }

  .progress-track {
    width: 100%;
    height: 4px;
    background: var(--panel-inset);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  .progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%; /* Default 0 for animation */
    border-radius: 2px;
    transition: width 1.4s var(--spring);
  }

  /* When the parent section is in view, we target the progress fills to expand to their custom prop */
  :global(.in-view) .progress-fill {
    width: var(--target-width);
  }

  /* Delay different bars based on index if we want, or just let them all fire together */
  /* We will let them fire simultaneously on cluster reveal for a clean effect */

  .tooltip {
    position: absolute;
    top: -30px;
    right: 0;
    background: var(--panel-raised);
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-primary);
    border-radius: 2px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    animation: tooltipIn 0.2s var(--ease) forwards;
    pointer-events: none; /* Let hover pass through */
  }

  .tooltip-badge {
    font-size: 0.65rem;
    padding: 2px 6px;
    color: var(--void);
    font-weight: bold;
    border-radius: 1px;
  }

  @keyframes tooltipIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .clusters-grid {
      grid-template-columns: 1fr;
    }
    
    .tooltip {
      /* Adjust mobile tooltip position slightly */
      right: 10px;
      top: -36px;
    }
  }
</style>
