<script>
  import { reveal } from '$lib/actions/scroll.js';
  import { onMount } from 'svelte';
  import { playPing } from '$lib/utils/audio.js';
  import { cubicOut, quintOut } from 'svelte/easing';

  // 4-Node Domain Topology
  const nodes = [
    { 
      id: 'cloud', 
      label: 'CLOUD_INFRASTRUCTURE', 
      x: 450, 
      y: 80, 
      color: 'var(--cyan)',
      icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />',
      telemetry: {
        domain: 'CLOUD & DISTRIBUTED SYSTEMS',
        status: 'EXPERT · CERTIFIED',
        stack: 'AWS SAA, Kubernetes, Serverless',
        focus: 'Highly available, scalable production architectures.',
        activeSkills: ['AWS (VPC, EC2, S3, RDS)', 'Docker & Kubernetes', 'Serverless Framework', 'CI/CD Pipelines']
      },
      skills: [
        { name: '● AWS (Solutions Architect SAA)', strength: 4, tooltip: 'Expert · Certified' },
        { name: '● HPE Aruba Cloud Platform', strength: 4, tooltip: 'Expert · Current Daily Work' },
        { name: '● Kubernetes (+ HPE Ezmeral)', strength: 4, tooltip: 'Expert · HPE Certified' },
        { name: '◉ Microsoft Azure (AZ-900)', strength: 3, tooltip: 'Proficient · Certified' },
        { name: '◉ Serverless Architecture', strength: 3, tooltip: 'Proficient · AWS Lambda' },
        { name: '◉ Solution Architecture & Design', strength: 3, tooltip: 'Proficient · Scalability Focus' }
      ]
    },
    { 
      id: 'network', 
      label: 'ENTERPRISE_NETWORKING', 
      x: 200, 
      y: 260, 
      color: 'var(--green)',
      icon: '<rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />',
      telemetry: {
        domain: 'CORE NETWORKING & SECURITY',
        status: 'EXPERT · DAILY WORK',
        stack: 'HPE Aruba, CCNA, Packet Analysis',
        focus: 'Enterprise-grade routing, switching, and secure edges.',
        activeSkills: ['HPE Aruba Architecture', 'Enterprise Route/Switch', 'Edge Security', 'Packet Analysis']
      },
      skills: [
        { name: '● Computer Networking (CCNA)', strength: 4, tooltip: 'Expert · Cisco Certified' },
        { name: '● Cybersecurity Operations', strength: 4, tooltip: 'Expert · Cisco Certified' },
        { name: '● Ethical Hacking', strength: 4, tooltip: 'Expert · Cisco Certified' },
        { name: '◉ AI for Networking', strength: 3, tooltip: 'Proficient · Cisco Certified' },
        { name: '◉ Network Devices Admin', strength: 3, tooltip: 'Proficient · Daily Administration' },
        { name: '◉ Wireshark & Packet Details', strength: 3, tooltip: 'Proficient · Troubleshooting' }
      ]
    },
    { 
      id: 'ai', 
      label: 'AI_AGENTS', 
      x: 700, 
      y: 260, 
      color: 'var(--purple)',
      icon: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M9 13a4.5 4.5 0 0 0 3-4" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M12 13h4" /><path d="M12 18h6a2 2 0 0 1 2 2v1" /><path d="M12 8h8" /><path d="M16 8V5a2 2 0 0 1 2-2" /><circle cx="16" cy="13" r=".5" /><circle cx="18" cy="3" r=".5" /><circle cx="20" cy="21" r=".5" /><circle cx="20" cy="8" r=".5" />',
      telemetry: {
        domain: 'AI & AUTONOMOUS AGENTS',
        status: 'MASTERING · ACTIVE RESEARCH',
        stack: 'LangChain, OpenAI, LLM Ops',
        focus: 'Building intelligent agents for infrastructure automation.',
        activeSkills: ['LangChain Workflows', 'Prompt Engineering', 'RAG pipelines', 'Vector DBs']
      },
      skills: [
        { name: '● LangChain / AI Agents', strength: 4, tooltip: 'Expert · LangChain Academy' },
        { name: '● AWS AI Practitioner', strength: 4, tooltip: 'Expert · AWS Certified' },
        { name: '◉ Anthropic & OpenAI APIs', strength: 3, tooltip: 'Proficient · Frequent Implementations' },
        { name: '◉ RAG Architecture', strength: 3, tooltip: 'Proficient · Semantic Data Retrieval' },
        { name: '◉ Prompt Engineering', strength: 3, tooltip: 'Proficient · Context Optimization' }
      ]
    },
    { 
      id: 'dev', 
      label: 'SOFTWARE_ENGINEERING', 
      x: 450, 
      y: 440, 
      color: 'var(--amber)',
      icon: '<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />',
      telemetry: {
        domain: 'CORE PROGRAMMING & FULL STACK',
        status: 'PROFICIENT · PRODUCTION CODE',
        stack: 'JS/TS, Python, Svelte, Go',
        focus: 'Writing robust backend services and interactive frontends.',
        activeSkills: ['Python scripting', 'JS/TS Web Apps', 'Database Architecture', 'API Design']
      },
      skills: [
        { name: '● Python', strength: 4, tooltip: 'Expert · HackerRank Certified' },
        { name: '● JavaScript / TypeScript', strength: 4, tooltip: 'Expert · Full-Stack Daily Use' },
        { name: '◉ SQL / NoSQL Databases', strength: 3, tooltip: 'Proficient · ZTM + HackerRank' },
        { name: '◉ Go (Golang)', strength: 3, tooltip: 'Proficient · HackerRank Certified' },
        { name: '◉ Java (Concurrent + Parallel)', strength: 3, tooltip: 'Proficient · Udemy Certified' },
        { name: '◉ React.js / Svelte / Node.js', strength: 3, tooltip: 'Proficient · Frontend & Backend' }
      ]
    }
  ];

  const links = [
    { from: 'cloud', to: 'network' },
    { from: 'cloud', to: 'ai' },
    { from: 'network', to: 'dev' },
    { from: 'ai', to: 'dev' },
    { from: 'network', to: 'ai', dashed: true },
    { from: 'cloud', to: 'dev', dashed: true }
  ];

  let hoveredNode = $state(null);
  let activeDomainId = $state(null);
  const activeDomain = $derived(nodes.find(n => n.id === activeDomainId));
  let currentTelemetrySkillIndex = $state(0);
  let activeTooltipId = $state(null);

  let inDir = $state(1);

  // Custom glitch logic simulating cyber space loading
  function warpSwap(node, { delay = 0, duration = 400, dir = 1, isOut = false }) {
    return {
      delay, duration, easing: isOut ? cubicOut : quintOut,
      css: t => {
        const u = 1 - t;
        const move = isOut ? -40 * dir : 40 * dir;
        return `
          opacity: ${t};
          transform: translateX(${u * move}px) scale(${1 - u * 0.05});
          filter: blur(${u * 8}px);
        `;
      }
    };
  }

  // Auto-cycle telemetry skills when hovering over node
  onMount(() => {
    const interval = setInterval(() => {
      if (hoveredNode && hoveredNode.telemetry.activeSkills) {
        currentTelemetrySkillIndex = (currentTelemetrySkillIndex + 1) % hoveredNode.telemetry.activeSkills.length;
      }
    }, 1500);
    return () => clearInterval(interval);
  });

  function handleNodeHover(node) {
    if (!activeDomainId) {
      if (hoveredNode?.id !== node.id) {
        hoveredNode = node;
        currentTelemetrySkillIndex = 0;
      }
    }
  }

  function handleNodeLeave() {
    if (!activeDomainId) {
        hoveredNode = null;
    }
  }

  function toggleDomain(node) {
    playPing();
    if (activeDomainId === node.id) {
      // Close active domain
      activeDomainId = null;
      hoveredNode = null; // Also clear hover to immediately return to neutral
    } else {
      // Open domain
      activeDomainId = node.id;
      hoveredNode = node; // Keep node hovered so telemetry panel stays engaged
    }
  }

  function cycleNode(direction) {
    if (!activeDomainId) return;
    playPing();
    inDir = direction;
    const currentIndex = nodes.findIndex(n => n.id === activeDomainId);
    let nextIndex = (currentIndex + direction) % nodes.length;
    if (nextIndex < 0) nextIndex += nodes.length;
    
    // Jump to the next node automatically
    const nextNode = nodes[nextIndex];
    activeDomainId = nextNode.id;
    hoveredNode = nextNode; // Keep hovered to update SVG glowing elements
  }

  function handleSkillHover(skillId) {
    activeTooltipId = skillId;
  }
  
  function handleSkillLeave(skillId) {
    if (activeTooltipId === skillId) {
      activeTooltipId = null;
    }
  }
</script>

<section id="infra" class="domain-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">§ 02 // DOMAIN TOPOLOGY & SKILLS</h2>
    <div class="header-line"></div>
  </header>

  <div class="topology-stage panel" class:domain-active={activeDomainId !== null}>
    <!-- Topology Graph -->
    <div class="graph-layer">
      <div class="svg-container">
        <svg viewBox="0 0 900 550" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Links -->
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
                class="data-line "
                class:active-line={hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id)}
              />
            {/if}
          {/each}

           <!-- Pulsing signal on links when node hovered -->
           {#if hoveredNode}
             {#each links as link}
               {@const source = nodes.find(n => n.id === link.from)}
               {@const target = nodes.find(n => n.id === link.to)}
               {#if hoveredNode.id === source.id || hoveredNode.id === target.id}
                 <circle r="4" fill={hoveredNode.color} filter="url(#glow-filter)">
                   <animateMotion dur="1.2s" repeatCount="indefinite"
                      path={`M ${hoveredNode.id === source.id ? source.x : target.x} ${hoveredNode.id === source.id ? source.y : target.y} L ${hoveredNode.id === source.id ? target.x : source.x} ${hoveredNode.id === source.id ? target.y : source.y}`}
                    />
                 </circle>
               {/if}
             {/each}
           {/if}

          <!-- Nodes -->
          {#each nodes as node}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <g 
              class="domain-node" 
              class:dimmed={activeDomainId !== null && activeDomainId !== node.id}
              role="button"
              tabindex="0"
              transform={`translate(${node.x}, ${node.y})`}
              onmouseenter={() => handleNodeHover(node)}
              onmouseleave={handleNodeLeave}
              onclick={() => toggleDomain(node)}
            >
              <!-- Orbital Rings -->
              <circle cx="0" cy="0" r="48" fill="none" stroke={node.color} stroke-width="1.5" stroke-dasharray="2 6" stroke-opacity="0.4" class="orbit" class:spin={hoveredNode?.id === node.id} />
              <circle cx="0" cy="0" r="38" fill="none" stroke={node.color} stroke-width="1.5" stroke-opacity="0.6" class="orbit-reverse" class:spin={hoveredNode?.id === node.id} />

              <!-- Core Plate -->
              <circle 
                cx="0" cy="0" r="28" 
                fill="var(--panel-inset)" 
                stroke={node.color} 
                stroke-width="2"
                class="node-plate"
                class:hovered={hoveredNode?.id === node.id}
                class:active-core={activeDomainId === node.id}
              />
              
              <!-- Glow Aura -->
              {#if hoveredNode?.id === node.id}
                <circle cx="0" cy="0" r="34" fill={node.color} fill-opacity="0.15" stroke={node.color} stroke-width="1" stroke-dasharray="4 4" class="pulse-ring" />
              {/if}
              
              <!-- Icon -->
              <g transform="translate(-19.2, -19.2) scale(1.6)" fill="none" stroke={node.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="node-icon" class:hovered-icon={hoveredNode?.id === node.id}>
                {@html node.icon}
              </g>
              
              <!-- Label text -->
              <rect x="-100" y="60" width="200" height="20" fill="transparent" />
              <text y="74" x="0" text-anchor="middle" class="node-label" fill="var(--text-secondary)">
                {node.label}
              </text>
            </g>
          {/each}
        </svg>
      </div>

      <!-- Live Telemetry Side Panel - absolute positioned to avoid SVG scaling interference -->
      <div class="telemetry-wrapper">
        <div class="telemetry-panel">
          <div class="telemetry-header">
            <span class="text-dim">CORE_TELEMETRY</span>
            <span class="text-cyan blink">● REC</span>
          </div>
          
          {#if hoveredNode}
            <div class="telemetry-data fade-in">
              <div class="node-name" style="color: {hoveredNode.color}">{hoveredNode.telemetry.domain}</div>
              
              <div class="data-block">
                <div class="data-label">STATUS</div>
                <div class="data-val text-primary">{hoveredNode.telemetry.status}</div>
              </div>
              
              <div class="data-block">
                <div class="data-label">TECH_STACK</div>
                <div class="data-val text-primary">{hoveredNode.telemetry.stack}</div>
              </div>
              
              <div class="data-block">
                <div class="data-label">FOCUS</div>
                <div class="data-val text-dim focus-text">{hoveredNode.telemetry.focus}</div>
              </div>

              <div class="metrics-area">
                <div class="data-label mb-2">RUNNING_PROCESSES</div>
                <div class="skill-display">
                  <span class="text-dim mr-1">></span>
                  {#key currentTelemetrySkillIndex}
                    <span class="telemetry-skill-text fade-text" style="color: {hoveredNode.color}">
                      {hoveredNode.telemetry.activeSkills[currentTelemetrySkillIndex]}
                    </span>
                  {/key}
                  <span class="cursor blink-fast" style="background: {hoveredNode.color}"></span>
                </div>
              </div>
              
              {#if activeDomainId !== hoveredNode.id}
                <div class="click-hint pulse" style="color: {hoveredNode.color}">
                  [ CLICK TO INITIATE DOMAIN LINK ]
                </div>
              {:else}
                <div class="click-hint text-muted">
                  [ LINK ESTABLISHED ]
                </div>
              {/if}
            </div>
          {:else}
            <div class="telemetry-empty text-muted">
              AWAITING_CORE_SELECTION_
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Active Skill Matrix -->
    {#if activeDomain}
      <div class="skills-wrapper fade-up">
        
        <div class="domain-controls">
          <button class="nav-btn" onclick={() => cycleNode(-1)}>« PREV_NODE</button>
          <button class="nav-btn term-btn" onclick={() => toggleDomain(activeDomain)}>■ TERMINATE</button>
          <button class="nav-btn" onclick={() => cycleNode(1)}>NEXT_NODE »</button>
        </div>

        <div class="anim-container">
          {#key activeDomainId}
            <div class="anim-item" in:warpSwap={{dir: inDir, isOut: false}} out:warpSwap={{dir: inDir, isOut: true}}>
              
              <div class="domain-header">
                <span class="domain-badge" style="background: {activeDomain.color}; box-shadow: 0 0 10px {activeDomain.color}">
                  {activeDomain.label}
                </span>
                <h3 class="domain-title">KNOWLEDGE BASE PROTOCOL</h3>
              </div>

              <div class="skills-grid">
                {#each activeDomain.skills as skill, idx}
                  {@const skillId = `${activeDomainId}-skill-${idx}`}
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
              class="skill-card panel panel--hollow" 
              style="--accent: {activeDomain.color}"
              onmouseenter={() => handleSkillHover(skillId)}
              onmouseleave={() => handleSkillLeave(skillId)}
            >
              <div class="skill-name">{skill.name}</div>
              
              <div class="skill-bottom">
                <div class="signal-gauge">
                  <div class="data-label">LINK_QUALITY</div>
                  <div class="led-blocks">
                    {#each Array(4) as _, i}
                      <span class="led-block" class:led-on={i < skill.strength} style="{i < skill.strength ? `background: ${activeDomain.color}; box-shadow: 0 0 5px ${activeDomain.color};` : ''}"></span>
                    {/each}
                  </div>
                </div>
                
                <div class="skill-type" style="color: var(--text-muted)">
                   {skill.strength === 4 ? '[EXPERT]' : skill.strength === 3 ? '[PROFICIENT]' : '[FAMILIAR]'}
                </div>
              </div>

              {#if activeTooltipId === skillId}
                 <div class="custom-tooltip fade-up-fast" style="border-color: {activeDomain.color}">
                   <span class="tooltip-badge" style="background: {activeDomain.color}">INSPECT</span>
                   {skill.tooltip}
                 </div>
              {/if}
            </div>
          {/each}
        </div>
            </div>
          {/key}
        </div>
      </div>
    {/if}
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

  /* Topology Stage handles the overall bounding box */
  .topology-stage {
    position: relative;
    width: 100%;
    min-height: 550px;
    background: radial-gradient(circle at center, var(--void) 0%, var(--panel) 100%);
    overflow: hidden;
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .topology-stage.domain-active {
    min-height: 800px;
    background: var(--panel-raised);
    border-color: var(--border-active);
  }

  /* Graph Layer holds SVG and Telemetry Side Panel */
  .graph-layer {
    position: relative;
    width: 100%;
    height: 550px;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .topology-stage.domain-active .graph-layer {
    height: 250px; 
    transform: scale(0.65) translateY(-25%);
    opacity: 0.85;
  }

  .svg-container {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 100%;
    height: 100%;
    max-height: 550px;
  }

  .domain-node {
    cursor: crosshair;
    outline: none;
    transition: opacity 0.3s ease;
  }

  .domain-node.dimmed {
    opacity: 0.2;
  }

  .node-plate {
    transition: fill 0.2s ease, transform 0.2s ease;
  }
  .node-plate.hovered, .node-plate.active-core {
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
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.1em;
    pointer-events: none;
    transition: fill 0.2s ease;
  }
  .domain-node:hover .node-label {
    fill: var(--text-bright);
  }

  .data-line {
    transition: stroke 0.2s ease, stroke-width 0.2s ease;
    opacity: 0.5;
  }
  .active-line {
    stroke-width: 3;
    opacity: 1;
    filter: drop-shadow(0 0 5px currentColor);
  }

  .orbit, .orbit-reverse { transform-origin: 0 0; }
  .orbit.spin { animation: spin 4s linear infinite; }
  .orbit-reverse.spin { animation: spin-reverse 5s linear infinite; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes spin-reverse { to { transform: rotate(-360deg); } }

  /* Telemetry Panel Overlay */
  .telemetry-wrapper {
    position: absolute;
    bottom: var(--space-4);
    right: 0;
    pointer-events: none; /* Let clicks pass through to SVG */
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .telemetry-panel {
    width: 320px;
    background: rgba(10, 10, 12, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-active);
    padding: var(--space-3);
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
  }

  .topology-stage.domain-active .telemetry-panel {
    /* Hide telemetry when looking at skills to reduce noise */
    opacity: 0; 
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

  .blink { animation: blinkFull 1s steps(2, start) infinite; }
  @keyframes blinkFull { to { visibility: hidden; } }

  .telemetry-data {
    display: flex; flex-direction: column; gap: var(--space-3);
  }

  .telemetry-empty {
    font-family: var(--font-mono); font-size: 0.85rem; padding: var(--space-4) 0; text-align: center; animation: pulseText 2s infinite;
  }
  @keyframes pulseText { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

  .node-name { font-family: var(--font-mono); font-size: 1rem; font-weight: bold; margin-bottom: var(--space-1); letter-spacing: 0.05em; }
  .data-block { display: flex; flex-direction: column; gap: 2px; }
  .data-label { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); letter-spacing: 0.1em; }
  .data-val { font-family: var(--font-mono); font-size: 0.85rem; }
  .focus-text { font-size: 0.75rem; line-height: 1.4; color: var(--text-muted); }

  .metrics-area { margin-top: var(--space-2); display: flex; flex-direction: column; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px dashed var(--border-subtle); }
  .mb-2 { margin-bottom: var(--space-2); }
  .mr-1 { margin-right: var(--space-1); }

  .skill-display { display: flex; align-items: center; font-family: var(--font-mono); font-size: 0.85rem; height: 1.5rem; }
  .telemetry-skill-text { flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fade-text { animation: textDecode 0.4s cubic-bezier(0.1, 0.9, 0.2, 1); }
  @keyframes textDecode { 0% { opacity: 0; transform: translateY(4px) skewX(20deg); filter: blur(2px); } 100% { opacity: 1; transform: translateY(0) skewX(0); filter: blur(0); } }

  .cursor { display: inline-block; width: 6px; height: 12px; margin-left: var(--space-1); border-radius: 1px; }
  .blink-fast { animation: blinkFast 0.8s steps(2, start) infinite; }
  @keyframes blinkFast { to { visibility: hidden; } }

  .click-hint {
    margin-top: var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: bold;
    text-align: right;
    letter-spacing: 0.05em;
  }
  .pulse { animation: opacPulse 2s infinite; }
  @keyframes opacPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

  /* Skills Wrapper (Animated below SVG) */
  .skills-wrapper {
    position: absolute;
    top: 280px; /* Right beneath the compressed SVG */
    left: var(--space-4);
    right: var(--space-4);
    bottom: var(--space-4);
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .domain-controls {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    position: relative;
    z-index: 10;
  }

  .nav-btn {
    position: relative;
    background: rgba(10, 10, 12, 0.6);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: var(--space-2) var(--space-4);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    letter-spacing: 0.1em;
    outline: none;
    /* Cyber frame clip-path */
    clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  }

  .nav-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: var(--cyan);
    opacity: 0.5;
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  }

  .nav-btn:hover {
    color: var(--void);
    border-color: var(--cyan);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
    font-weight: bold;
  }

  .nav-btn:hover::before {
    width: 100%;
    opacity: 1;
    z-index: -1;
  }

  .term-btn::before {
    background: var(--amber); /* using amber for terminate/warning */
  }

  .term-btn:hover {
    border-color: var(--amber);
    box-shadow: 0 0 20px rgba(255, 176, 0, 0.4);
  }

  .anim-container {
    display: grid;
  }
  .anim-item {
    grid-area: 1 / 1;
    display: flex;
    flex-direction: column;
  }

  .domain-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
  }

  .domain-badge {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--void);
    font-weight: bold;
    padding: var(--space-1) var(--space-3);
    border-radius: 20px;
    letter-spacing: 0.05em;
  }

  .domain-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--text-primary);
    letter-spacing: 0.1em;
    margin: 0;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-4);
    overflow-y: auto;
    max-height: calc(100% - 80px); /* Leave room for header */
    padding-bottom: var(--space-4);
  }

  .skill-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-3);
    padding: var(--space-4);
    border-left: 3px solid var(--accent);
    cursor: crosshair;
    transition: transform 0.2s, background 0.2s;
  }

  .skill-card:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.02);
  }

  .skill-name {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--text-primary);
    letter-spacing: 0.02em;
    font-weight: bold;
  }

  .skill-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .skill-type {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.05em;
  }

  .signal-gauge {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .led-blocks {
    display: flex;
    gap: 3px;
    height: 12px;
  }

  .led-block {
    width: 6px;
    height: 100%;
    background: var(--panel-inset);
    border-radius: 1px;
    transition: background 0.3s, box-shadow 0.3s;
  }

  .custom-tooltip {
    position: absolute;
    top: -30px;
    right: 0;
    background: var(--panel-raised);
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-primary);
    border: 1px solid currentColor;
    border-radius: 2px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    pointer-events: none;
  }

  .tooltip-badge {
    font-size: 0.65rem;
    padding: 2px 6px;
    color: var(--void);
    font-weight: bold;
    border-radius: 1px;
  }

  .fade-up-fast {
    animation: tooltipIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes tooltipIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    .topology-stage.domain-active .graph-layer {
      transform: scale(0.5) translateY(-35%);
    }
  }

  @media (max-width: 768px) {
    .telemetry-wrapper {
      position: static;
      justify-content: center;
      margin-top: var(--space-4);
    }
    .topology-stage.domain-active {
      min-height: 900px;
    }
    .skills-wrapper {
      position: static;
      margin-top: var(--space-4);
      animation: none; /* simple stack on mobile */
    }
    .domain-controls {
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    .nav-btn {
      flex: 1 1 calc(33% - var(--space-2));
      text-align: center;
      padding: var(--space-2);
      font-size: 0.65rem;
    }
  }
</style>
