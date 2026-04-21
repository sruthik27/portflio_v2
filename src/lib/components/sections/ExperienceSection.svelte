<script>
  import { reveal } from '$lib/actions/scroll.js';
  import { onMount } from 'svelte';

  let currentDuration = $state('calculating...');

  onMount(() => {
    const startDate = new Date('2024-09-01T00:00:00');
    
    function calculateDuration() {
      const now = new Date();
      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + now.getMonth() - startDate.getMonth();
      if (now.getDate() < startDate.getDate()) months--;
      
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      
      if (years > 0) {
        currentDuration = `${years}y ${remMonths}m ongoing`;
      } else {
        currentDuration = `${months} months ongoing`;
      }
    }

    calculateDuration();
    const interval = setInterval(calculateDuration, 60000); // Check every minute
    return () => clearInterval(interval);
  });

  const experiences = [
    {
      id: "CHANGE-0002",
      env: "PRODUCTION",
      state: "ACTIVE — ONGOING",
      company: "HEWLETT PACKARD ENTERPRISE",
      role: "Cloud Engineer — Aruba Networks",
      node: "Chennai, Tamil Nadu, India",
      started: "Sep 2024",
      finished: "present",
      duration: () => currentDuration,
      status: "LIVE",
      actions: [
        "Developing cloud solutions with Aruba Networks within HPE",
        "Building and maintaining cloud infrastructure at scale",
        "Applying AWS, networking, and containerization in production"
      ],
      impact: "HIGH · Zero downtime maintained",
      isActive: true,
      accent: "cyan"
    },
    {
      id: "CHANGE-0001",
      env: "STAGING",
      state: "COMPLETED",
      company: "HEWLETT PACKARD ENTERPRISE",
      role: "Cloud Developer Intern",
      node: "Chennai, Tamil Nadu, India",
      started: "Feb 2024",
      finished: "Aug 2024",
      duration: () => "7 months",
      status: "ARCHIVED",
      actions: [
        "Cloud development internship — foundation for full-time role",
        "Contributed to cloud platform projects within HPE"
      ],
      impact: "MEDIUM — Successfully converted to full-time employment",
      isActive: false,
      accent: "text-dim"
    }
  ];
</script>

<section id="experience" class="experience-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">§ 03 // CHANGE MANAGEMENT LOG</h2>
    <div class="header-line"></div>
  </header>

  <div class="timeline-container">
    <div class="timeline-line"></div>

    <div class="entries-list">
      {#each experiences as exp, index}
        <div class="timeline-entry reveal-item fade-up stagger-1" use:reveal>
          <div class="timeline-marker">
            <div class="timeline-dot {exp.isActive ? 'active-pulse' : ''}"></div>
          </div>
          
          <div class="panel entry-panel {exp.isActive ? 'panel--cyan' : ''}">
            <div class="entry-header">
              <span class="change-id text-muted">{exp.id}</span>
              <div class="tags">
                <span class="tag border-green text-green">[● {exp.env}]</span>
                {#if exp.isActive}
                  <span class="tag border-cyan text-cyan">[● {exp.state}]</span>
                {:else}
                  <span class="tag border-subtle text-muted">[✓ {exp.state}]</span>
                {/if}
              </div>
            </div>

            <div class="company-info">
              <h3 class="company text-bright glow-hover">{exp.company}</h3>
              <div class="role text-cyan">{exp.role}</div>
            </div>

            <div class="metadata-grid">
              <div class="meta-item"><span class="meta-label">NODE:</span> {exp.node}</div>
              <div class="meta-row">
                <div class="meta-item"><span class="meta-label">STARTED:</span> {exp.started}</div>
                {#if !exp.isActive}
                  <div class="meta-item"><span class="meta-label">FINISHED:</span> {exp.finished}</div>
                {/if}
                <div class="meta-item"><span class="meta-label">DURATION:</span> <span class={exp.isActive ? "text-green" : ""}>{typeof exp.duration === 'function' ? exp.duration() : exp.duration}</span></div>
                <div class="meta-item"><span class="meta-label">STATUS:</span> {exp.status}</div>
              </div>
            </div>

            <div class="actions-block">
              <div class="meta-label">ACTIONS:</div>
              <ul class="action-list">
                {#each exp.actions as action}
                  <li><span class="bullet text-cyan">▸</span> {action}</li>
                {/each}
              </ul>
            </div>

            <div class="impact-block">
              <span class="meta-label">IMPACT:</span> <span class="text-primary">{exp.impact}</span>
            </div>
          </div>
        </div>
      {/each}
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

  .timeline-container {
    position: relative;
    padding-left: var(--space-4);
  }

  .timeline-line {
    position: absolute;
    left: 41px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--cyan) 0%, var(--green) 30%, var(--border-subtle) 100%);
    box-shadow: 0 0 10px var(--cyan-glow);
    z-index: 1;
  }

  .entries-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
    position: relative;
    z-index: 2;
  }

  .timeline-entry {
    display: flex;
    gap: var(--space-5);
    position: relative;
  }

  .timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48px;
    flex-shrink: 0;
    padding-top: var(--space-4);
  }

  .timeline-dot {
    width: 12px;
    height: 12px;
    background: var(--void);
    border: 2px solid var(--text-dim);
    border-radius: 50%;
    position: relative;
    z-index: 3;
  }

  /* Status specific styles */
  .active-pulse {
    background: var(--green);
    border-color: var(--green);
    box-shadow: 0 0 10px var(--green);
    animation: activePulseAnim 2s infinite;
  }

  @keyframes activePulseAnim {
    0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
  }

  .entry-panel {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  .change-id {
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    letter-spacing: 0.1em;
  }

  .tags {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 2px;
    letter-spacing: 0.05em;
  }

  .border-green { border: 1px solid var(--green-border); }
  .border-cyan { border: 1px solid var(--cyan-border); }
  .border-subtle { border: 1px solid var(--border-subtle); }
  
  .text-green { color: var(--green); }
  .text-cyan { color: var(--cyan); }
  .text-muted { color: var(--text-muted); }
  .text-bright { color: var(--text-bright); }
  .text-primary { color: var(--text-primary); }

  .company-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    border-bottom: 1px dashed var(--border-subtle);
    padding-bottom: var(--space-3);
  }

  .company {
    font-family: var(--font-display);
    font-size: 1.4rem;
    margin: 0;
    letter-spacing: 0.05em;
  }

  .role {
    font-family: var(--font-mono);
    font-size: var(--text-label);
  }

  .metadata-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    color: var(--text-secondary);
    background: var(--panel-inset);
    padding: var(--space-3);
    border: 1px solid var(--border-subtle);
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-5);
    row-gap: var(--space-2);
  }

  .meta-label {
    color: var(--text-dim);
    margin-right: var(--space-2);
  }

  .actions-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .action-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    color: var(--text-primary);
  }

  .action-list li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    line-height: 1.5;
  }

  .bullet {
    font-family: var(--font-mono);
    margin-top: 2px;
  }

  .impact-block {
    margin-top: var(--space-2);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-subtle);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
  }

  @media (max-width: 768px) {
    .timeline-container {
      padding-left: 0;
    }

    .timeline-line {
      left: 15px; /* Adjust for smaller marker */
    }

    .timeline-marker {
      width: 32px;
    }

    .meta-row {
      flex-direction: column;
      gap: var(--space-2);
    }
  }
</style>
