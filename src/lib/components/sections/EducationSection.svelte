<script>
  import { reveal } from '$lib/actions/scroll.js';

  const educationModules = [
    {
      id: "MOD-01",
      module: "Thiagarajar College of Engineering",
      version: "v4.0 (B.E. Electronics & Communications Engineering)",
      duration: "Nov 2020 – Jun 2024",
      grade: "CGPA 9.0 / 10",
      status: "VERIFIED",
      location: "Madurai, TN",
      accent: "cyan"
    },
    {
      id: "MOD-00",
      module: "Rotary Laharry Matriculation HSS",
      version: "v1.2 (Higher Secondary · HSC)",
      duration: "Jun 2017 – Mar 2019",
      grade: null,
      status: "ARCHIVED",
      location: "Madurai, TN",
      accent: "border-subtle"
    }
  ];
</script>

<section id="education" class="education-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">▸ 06 // FIRMWARE & TRAINING MODULES</h2>
    <div class="header-line"></div>
  </header>

  <div class="modules-grid">
    {#each educationModules as edu}
      <div class="panel fw-card {edu.accent === 'cyan' ? 'panel--cyan' : ''} reveal-item fade-up stagger-1" use:reveal>
        <div class="fw-header bg-{edu.accent}">
          <span class="fw-title text-void">FIRMWARE_IMAGE_LOAD >> {edu.module.toUpperCase()}</span>
          <span class="fw-badge">{edu.id}</span>
        </div>
        
        <div class="fw-body">
          <div class="fw-row">
            <span class="fw-key">MODULE_NAME:</span>
            <span class="fw-val text-primary">{edu.module}</span>
          </div>
          <div class="fw-row">
            <span class="fw-key">VERSION_BUILD:</span>
            <span class="fw-val text-cyan">{edu.version}</span>
          </div>
          <div class="fw-row">
            <span class="fw-key">UPTIME_SPAN:</span>
            <span class="fw-val text-dim">{edu.duration}</span>
          </div>
          <div class="fw-row">
            <span class="fw-key">SECTOR_NODE:</span>
            <span class="fw-val text-secondary">{edu.location}</span>
          </div>
          {#if edu.grade}
          <div class="fw-row">
            <span class="fw-key">CHECKSUM:</span>
            <span class="fw-val text-green">{edu.grade}</span>
          </div>
          {/if}
          <div class="fw-row">
            <span class="fw-key">INTEGRITY_CHK:</span>
            <span class="fw-val {edu.status === 'VERIFIED' ? 'text-green' : 'text-muted'}">
              {#if edu.status === 'VERIFIED'}
                [ OK ] {edu.status}
              {:else}
                [ -- ] {edu.status}
              {/if}
            </span>
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

  .modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: var(--space-5);
  }

  .fw-card {
    padding: 0; /* Override default panel padding for custom header */
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .fw-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .bg-cyan { background: var(--cyan); color: var(--void); }
  .bg-border-subtle { background: var(--border-subtle); color: var(--text-secondary); }
  
  .text-void { color: var(--void) !important; }
  .text-cyan { color: var(--cyan); }
  .text-green { color: var(--green); }
  .text-primary { color: var(--text-primary); }
  .text-secondary { color: var(--text-secondary); }
  .text-dim { color: var(--text-dim); }
  .text-muted { color: var(--text-muted); }

  .fw-badge {
    opacity: 0.8;
  }

  .fw-body {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    background: var(--panel-inset);
    flex-grow: 1;
  }

  .fw-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: var(--space-3);
    align-items: baseline;
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    border-bottom: 1px dashed var(--border-subtle);
    padding-bottom: var(--space-2);
  }

  .fw-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .fw-key {
    color: var(--text-dim);
  }

  .fw-val {
    /* Wrapping disabled to look like terminal lines */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    .modules-grid {
      grid-template-columns: 1fr;
    }

    .fw-row {
      grid-template-columns: 1fr;
      gap: var(--space-1);
    }

    /* On mobile, let values wrap fully — readability beats terminal-line aesthetic
       when the column is too narrow to fit a degree name. */
    .fw-val {
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
      overflow-wrap: anywhere;
    }
  }
</style>
