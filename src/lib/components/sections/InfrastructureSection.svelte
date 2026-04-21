<script>
  import { reveal } from '$lib/actions/scroll.js';
  import { onMount } from 'svelte';

  // Tri-Core Expertise Nodes
  const nodes = [
    { 
      id: 'cloud', 
      label: 'CLOUD_INFRASTRUCTURE', 
      x: 450, 
      y: 80, 
      color: 'var(--cyan)',
      icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />',
      data: {
        domain: 'CLOUD & DISTRIBUTED SYSTEMS',
        status: 'EXPERT · CERTIFIED',
        stack: 'AWS SAA, Kubernetes, Serverless',
        focus: 'Highly available, scalable production architectures.',
        activeSkills: [
          'AWS (VPC, EC2, S3, RDS)',
          'Docker & Kubernetes (EKS)',
          'Serverless Framework',
          'Terraform & Pulumi',
          'CI/CD Pipelines (Actions)'
        ]
      }
    },
    { 
      id: 'network', 
      label: 'ENTERPRISE_NETWORKING', 
      x: 250, 
      y: 280, 
      color: 'var(--green)',
      icon: '<rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />',
      data: {
        domain: 'CORE NETWORKING & SECURITY',
        status: 'EXPERT · DAILY WORK',
        stack: 'HPE Aruba, CCNA, Packet Analysis',
        focus: 'Enterprise-grade routing, switching, and secure edges.',
        activeSkills: [
          'HPE Aruba Architecture',
          'Enterprise Route & Switch',
          'Edge Security (Firewalls)',
          'Packet Analysis (Wireshark)',
          'Network Automation (Python)'
        ]
      }
    },
    { 
      id: 'ai', 
      label: 'AI_AGENTS', 
      x: 650, 
      y: 280, 
      color: 'var(--purple)',
      icon: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M9 13a4.5 4.5 0 0 0 3-4" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M12 13h4" /><path d="M12 18h6a2 2 0 0 1 2 2v1" /><path d="M12 8h8" /><path d="M16 8V5a2 2 0 0 1 2-2" /><circle cx="16" cy="13" r=".5" /><circle cx="18" cy="3" r=".5" /><circle cx="20" cy="21" r=".5" /><circle cx="20" cy="8" r=".5" />',
      data: {
        domain: 'AI & AUTONOMOUS AGENTS',
        status: 'MASTERING · ACTIVE RESEARCH',
        stack: 'LangChain, OpenAI, LLM Ops',
        focus: 'Building intelligent agents for infrastructure automation.',
        activeSkills: [
          'LangChain & Agentic Workflows',
          'LLM Integration (OpenAI/Anthropic)',
          'Retrieval-Augmented Gen (RAG)',
          'Vector Databases',
          'Prompt Engineering'
        ]
      }
    }
  ];

  // Connections between nodes (forming a triangle)
  const links = [
    { from: 'cloud', to: 'network' },
    { from: 'cloud', to: 'ai' },
    { from: 'network', to: 'ai', dashed: true }
  ];

  let hoveredNode = $state(null);
  let currentSkillIndex = $state(0);

  function handleMouseOver(node) {
    if (hoveredNode?.id !== node.id) {
      hoveredNode = node;
      currentSkillIndex = 0;
    }
  }

  function handleMouseLeave() {
    hoveredNode = null;
  }

  onMount(() => {
    // Cycle through skills when a node is hovered
    const interval = setInterval(() => {
      if (hoveredNode && hoveredNode.data.activeSkills) {
        currentSkillIndex = (currentSkillIndex + 1) % hoveredNode.data.activeSkills.length;
      }
    }, 1500);

    return () => clearInterval(interval);
  });
</script>

<section id="infrastructure" class="infra-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">§ 09 // DOMAIN ARCHITECTURE</h2>
    <div class="header-line"></div>
  </header>

  <div class="diagram-container panel">
    <div class="svg-wrapper">
      <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Draw links -->
        {#each links as link}
          {@const source = nodes.find(n => n.id === link.from)}
          {@const target = nodes.find(n => n.id === link.to)}
          {#if source && target}
            <path 
              d={`M ${source.x} ${source.y} L ${target.x} ${target.y}`} 
              stroke="var(--border-active)" 
              stroke-width="2" 
              fill="none" 
              stroke-dasharray={link.dashed ? "6 6" : "none"}
              class="data-line {hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id) ? 'active-line' : ''}"
            />
          {/if}
        {/each}

        <!-- Draw animated pulses along active lines -->
        {#if hoveredNode}
           {#each links as link}
             {@const source = nodes.find(n => n.id === link.from)}
             {@const target = nodes.find(n => n.id === link.to)}
             {#if hoveredNode.id === source.id || hoveredNode.id === target.id}
               <circle r="4" fill={hoveredNode.color} filter="url(#glow)">
                 <animateMotion 
                    dur="1.5s" 
                    repeatCount="indefinite"
                    path={`M ${hoveredNode.id === source.id ? source.x : target.x} ${hoveredNode.id === source.id ? source.y : target.y} L ${hoveredNode.id === source.id ? target.x : source.x} ${hoveredNode.id === source.id ? target.y : source.y}`}
                  />
               </circle>
             {/if}
           {/each}
        {/if}

        <!-- Draw nodes -->
        {#each nodes as node}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <g 
            class="infra-node" 
            role="button"
            aria-label={node.label}
            transform={`translate(${node.x}, ${node.y})`}
            onmouseenter={() => handleMouseOver(node)}
            onmouseleave={handleMouseLeave}
            onfocus={() => handleMouseOver(node)}
            onblur={handleMouseLeave}
            onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? handleMouseOver(node) : null}
            tabindex="0"
          >
            <!-- Orbiting rings to signify major domain -->
            <circle cx="0" cy="0" r="48" fill="none" stroke={node.color} stroke-width="1" stroke-dasharray="2 4" stroke-opacity="0.3" class="orbit {hoveredNode?.id === node.id ? 'orbit-spin' : ''}" />
            <circle cx="0" cy="0" r="38" fill="none" stroke={node.color} stroke-width="1" stroke-opacity="0.5" class="orbit-reverse {hoveredNode?.id === node.id ? 'orbit-spin' : ''}" />

            <!-- Solid Circular Backing -->
            <circle 
              cx="0" cy="0" r="28" 
              fill="var(--panel-inset)" 
              stroke={node.color} 
              stroke-width="2"
              class="node-plate {hoveredNode?.id === node.id ? 'hovered' : ''}"
            />
            
            <!-- Glow effect when hovered -->
            {#if hoveredNode?.id === node.id}
              <circle cx="0" cy="0" r="34" fill={node.color} fill-opacity="0.1" stroke={node.color} stroke-width="1" stroke-dasharray="4 4" class="pulse-ring" />
            {/if}
            
            <!-- SVG Icon Core -->
            <g transform="translate(-19.2, -19.2) scale(1.6)" fill="none" stroke={node.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="node-icon {hoveredNode?.id === node.id ? 'hovered-icon' : ''}">
              {@html node.icon}
            </g>
            
            <!-- Label -->
            <text y="70" x="0" text-anchor="middle" class="node-label" fill="var(--text-secondary)">
              {node.label}
            </text>
          </g>
        {/each}
      </svg>
    </div>

    <!-- Live Telemetry Overlay -->
    <div class="telemetry-panel">
      <div class="telemetry-header">
        <span class="text-dim">CORE_TELEMETRY</span>
        <span class="text-cyan blink">● REC</span>
      </div>
      
      {#if hoveredNode}
        <div class="telemetry-data fade-in">
          <div class="node-name" style="color: {hoveredNode.color}">{hoveredNode.data.domain}</div>
          
          <div class="data-block">
            <div class="data-label">STATUS</div>
            <div class="data-val text-primary">{hoveredNode.data.status}</div>
          </div>
          
          <div class="data-block">
            <div class="data-label">TECH_STACK</div>
            <div class="data-val text-primary">{hoveredNode.data.stack}</div>
          </div>
          
          <div class="data-block">
            <div class="data-label">FOCUS</div>
            <div class="data-val text-dim focus-text">{hoveredNode.data.focus}</div>
          </div>

          <div class="metrics-area">
            <div class="data-label mb-2">RUNNING_PROCESSES</div>
            <div class="skill-display">
              <span class="text-dim mr-1">></span>
              {#key currentSkillIndex}
                <span class="skill-text fade-text" style="color: {hoveredNode.color}">
                  {hoveredNode.data.activeSkills[currentSkillIndex]}
                </span>
              {/key}
              <span class="cursor blink-fast" style="background: {hoveredNode.color}"></span>
            </div>
          </div>
        </div>
      {:else}
        <div class="telemetry-empty text-muted">
          AWAITING_CORE_SELECTION_
        </div>
      {/if}
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

  .diagram-container {
    position: relative;
    padding: var(--space-4);
    min-height: 450px;
    background: radial-gradient(circle at center, var(--void) 0%, var(--panel) 100%);
    overflow: hidden;
  }

  .svg-wrapper {
    width: 100%;
    height: 100%;
  }

  svg {
    width: 100%;
    height: auto;
    max-height: 550px;
  }

  .infra-node {
    cursor: crosshair;
    outline: none;
  }

  .node-plate {
    transition: fill 0.2s ease, transform 0.2s ease;
  }

  .node-plate.hovered {
    fill: var(--void);
    transform: scale(1.05);
  }

  .node-icon {
    transition: filter 0.2s ease, stroke-width 0.2s ease;
  }

  .hovered-icon {
    filter: drop-shadow(0 0 6px currentColor);
    stroke-width: 2;
  }

  .pulse-ring {
    animation: pulse 2s ease-out infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.9); opacity: 0.8; }
    100% { transform: scale(1.3); opacity: 0; }
  }

  .node-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.1em;
    pointer-events: none;
    transition: fill 0.2s ease;
  }

  .infra-node:hover .node-label {
    fill: var(--text-bright);
  }

  .data-line {
    transition: stroke 0.2s ease, stroke-width 0.2s ease;
  }

  .active-line {
    stroke-width: 3;
    filter: drop-shadow(0 0 5px currentColor);
  }

  .orbit {
    transform-origin: 0 0;
  }

  .orbit-reverse {
    transform-origin: 0 0;
  }

  .orbit-spin {
    animation: spin 6s linear infinite;
  }

  .orbit-reverse.orbit-spin {
    animation: spin-reverse 8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes spin-reverse {
    to { transform: rotate(-360deg); }
  }

  /* Telemetry Panel Overlay */
  .telemetry-panel {
    position: absolute;
    bottom: var(--space-4);
    right: var(--space-4);
    width: 300px; /* Slightly wider for new content */
    background: rgba(10, 10, 12, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-active);
    padding: var(--space-3);
    pointer-events: none;
  }

  .telemetry-header {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    margin-bottom: var(--space-3);
    border-bottom: 1px dotted var(--border-subtle);
    padding-bottom: var(--space-2);
  }

  .blink {
    animation: blinkFull 1s steps(2, start) infinite;
  }

  @keyframes blinkFull {
    to { visibility: hidden; }
  }

  .telemetry-data {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .telemetry-empty {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    padding: var(--space-4) 0;
    text-align: center;
    animation: pulseText 2s infinite;
  }

  @keyframes pulseText {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .node-name {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: var(--space-1);
    letter-spacing: 0.05em;
  }

  .data-block {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .data-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }

  .data-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
  }

  .data-val {
    font-family: var(--font-mono);
    font-size: 0.85rem;
  }

  .focus-text {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  .metrics-area {
    margin-top: var(--space-2);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding-top: var(--space-3);
    border-top: 1px dashed var(--border-subtle);
  }

  .mb-2 { margin-bottom: var(--space-2); }
  .mr-1 { margin-right: var(--space-1); }

  .skill-display {
    display: flex;
    align-items: center;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    height: 1.5rem;
  }

  .skill-text {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fade-text {
    animation: textDecode 0.4s cubic-bezier(0.1, 0.9, 0.2, 1);
  }

  @keyframes textDecode {
    0% { opacity: 0; transform: translateY(4px) skewX(20deg); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0) skewX(0); filter: blur(0); }
  }

  .cursor {
    display: inline-block;
    width: 6px;
    height: 12px;
    margin-left: var(--space-1);
    border-radius: 1px;
  }

  .blink-fast {
    animation: blinkFast 0.8s steps(2, start) infinite;
  }

  @keyframes blinkFast {
    to { visibility: hidden; }
  }

  .text-primary { color: var(--text-primary); }
  .text-dim { color: var(--text-dim); }
  .text-cyan { color: var(--cyan); }
  .text-muted { color: var(--text-muted); }

  @media (max-width: 768px) {
    .telemetry-panel {
      position: static;
      width: 100%;
      margin-top: var(--space-4);
    }
  }
</style>
