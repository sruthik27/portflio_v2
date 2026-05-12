<script>
  import { reveal } from '$lib/actions/scroll.js';

  // Source of truth: linkedin.com/in/sruthik-issac/details/certifications/ (33 total)
  // Featured 7 with high-res certificate images
  const featured = [
    { id: 'aws-saa', name: 'AWS Solutions Architect Associate (SAA-C03)', authority: 'AWS', tag: 'Cloud', class: '', date: 'Oct 2024 · expires Oct 2027', image: '/assets/certificates/aws-saa.png', url: 'https://www.credly.com/badges/c4048f00-9582-48de-9769-d988ebc1fe0d/public_url' },
    { id: 'aws-ai', name: 'AWS Certified AI Practitioner', authority: 'AWS', tag: 'Agent', class: '', date: 'Apr 2025 · expires Apr 2028', image: '/assets/certificates/aws-ai.png', url: 'https://www.credly.com/badges/b3453751-564c-4c34-b3a8-f021a4e6eac7/linked_in_profile' },
    { id: 'ccna', name: 'Cisco Certified Network Associate (CCNA)', authority: 'Cisco', tag: 'Networking', class: '', date: 'Jan 2026 · expires Jan 2029', image: '/assets/certificates/ccna.png', url: 'https://www.credly.com/badges/9ed33757-4118-43d1-ab23-7d0317d7f019/linked_in_profile' },
    { id: 'arangodb', name: 'ArangoDB Certified Professional', authority: 'ArangoDB', tag: 'Full Stack', class: '', date: 'Aug 2024', image: '/assets/certificates/arangodb.png', url: null },
    { id: 'ethical-hacker', name: 'Ethical Hacker', authority: 'Cisco', tag: 'Networking', class: '', date: 'Jun 2024', image: '/assets/certificates/ethical-hacker.png', url: 'https://www.credly.com/badges/c004134e-4f4d-46b0-9737-77e200ab5d4a/public_url' },
    { id: 'graphql', name: 'GraphQL Developer Associate', authority: 'Apollo', tag: 'Full Stack', class: '', date: 'Aug 2024', image: '/assets/certificates/graphql.png', url: 'https://www.apollographql.com/tutorials/certifications/da1e3195-d193-4c4e-b2b6-876b70c15beb' },
    { id: 'langchain', name: 'LangChain Essentials', authority: 'LangChain', tag: 'Agent', class: '', date: 'Jan 2026', image: '/assets/certificates/langchain.png', url: 'https://academy.langchain.com/certificates/tphiklamp2' }
  ];

  // Remaining 26 certs (33 total − 7 featured) — verbatim from LinkedIn certifications detail
  const categories = {
    'Cisco': [
      { name: 'AI for Networking',                          tag: 'Agent',      date: 'Jul 2025 · expires Jul 2028', url: 'https://www.credly.com/badges/0e2099e9-1bf4-41fc-8c0d-9dfe415c2623/linked_in_profile' },
      { name: 'Networking Devices and Initial Configuration', tag: 'Networking', date: 'Jan 2025',                    url: 'https://www.credly.com/badges/a329ff3a-a282-48d3-8e43-8ca26b090346/linked_in_profile' },
      { name: 'Introduction to Cybersecurity',              tag: 'Networking', date: 'Jan 2024',                    url: 'https://www.credly.com/badges/29924e59-c257-4bba-884a-7b729f86cea2/linked_in_profile' },
      { name: 'Networking Basics',                          tag: 'Networking', date: 'Aug 2023',                    url: 'https://www.credly.com/badges/1314dcf4-fa0e-4137-8aeb-2ea57b11d28c/linked_in_profile' },
      { name: 'CCNA: Introduction to Networks',             tag: 'Networking', date: 'Mar 2023 · expired Mar 2026', url: 'https://www.credly.com/badges/1da277c9-5c9a-45c6-98f2-11b709d86267/linked_in_profile' }
    ],
    'Microsoft': [
      { name: 'Azure Fundamentals (AZ-900)',                tag: 'Cloud',      date: 'Dec 2023',                    url: 'https://learn.microsoft.com/api/credentials/share/en-us/SRUTHIKI-2664/E516129387546A86' }
    ],
    'HPE': [
      { name: 'Application Containers and Kubernetes',      tag: 'Cloud',      date: 'Aug 2023',                    url: 'https://verify.skilljar.com/c/7u2dyww3wqpy' },
      { name: 'Open Source Tools and HPE Ezmeral Software', tag: 'Cloud',      date: 'Aug 2023',                    url: 'http://verify.skilljar.com/c/v636fzrkzncy' }
    ],
    'HackerRank': [
      { name: 'Go Basics',                                  tag: 'Full Stack', date: 'Oct 2024',                    url: 'https://www.hackerrank.com/certificates/4799cc69e912' },
      { name: 'REST API',                                   tag: 'Full Stack', date: 'Aug 2023',                    url: 'https://www.hackerrank.com/certificates/17827f9ef069' },
      { name: 'C#',                                         tag: 'Full Stack', date: 'Jun 2023',                    url: 'https://www.hackerrank.com/certificates/90b7685b4496' },
      { name: 'SQL',                                        tag: 'Full Stack', date: 'Jun 2023',                    url: 'https://www.hackerrank.com/certificates/8867595f6cd3' },
      { name: 'Problem Solving',                            tag: 'Full Stack', date: 'Jun 2023',                    url: 'https://www.hackerrank.com/certificates/45a980007a73' },
      { name: 'Python Basics',                              tag: 'Full Stack', date: 'Jun 2023',                    url: 'https://www.hackerrank.com/certificates/0e066a91641b' }
    ],
    'ZTM': [
      { name: 'The Complete Web Developer',                 tag: 'Full Stack', date: 'Nov 2023',                    url: 'https://www.udemy.com/certificate/UC-fa485113-20a2-4e49-9a30-3ee1edc863e9/' },
      { name: 'Web & Mobile Designer · UI/UX',              tag: 'Full Stack', date: 'Jul 2023',                    url: 'https://www.ude.my/UC-d1a52d26-33a7-49a5-b0bf-db74d9abbfd5' },
      { name: 'Complete SQL & Databases Bootcamp',          tag: 'Full Stack', date: 'May 2023',                    url: 'https://www.udemy.com/certificate/UC-ee86519b-768a-4854-b0e2-3fb58b951b65/' }
    ],
    'Udemy': [
      { name: 'Concurrent and Parallel Programming with Java', tag: 'Full Stack', date: 'Jun 2024',                 url: 'https://www.udemy.com/certificate/UC-68a5b5db-f754-4300-9c38-d4397ceeaa39/' },
      { name: 'TypeScript with React',                      tag: 'Full Stack', date: 'Jun 2024',                    url: 'https://www.udemy.com/certificate/UC-1836e585-b706-44b8-a59e-5580fc1cb433/' }
    ],
    'Google': [
      { name: 'The Bits and Bytes of Computer Networking',  tag: 'Networking', date: 'Dec 2024',                    url: 'https://www.coursera.org/account/accomplishments/verify/ATWWK7L1756N' }
    ],
    'NPTEL': [
      { name: 'Cloud Computing (IIT Kharagpur)',            tag: 'Cloud',      date: 'Oct 2022',                    url: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL22CS87S5421118910067059' }
    ],
    'Confluent': [
      { name: 'Confluent Fundamentals Accreditation',       tag: 'Cloud',      date: 'Jul 2024',                    url: 'https://certificates.confluent.io/1e4de551-417d-46e8-a446-84dec4a243bf' }
    ],
    'Redis': [
      { name: 'Redis Streams',                              tag: 'Full Stack', date: 'Aug 2024',                    url: 'https://university.redis.com/certificates/b1933ae1a3d443c89fe52113ab822f8b' },
      { name: 'Redis for Java Developers',                  tag: 'Full Stack', date: 'Aug 2024',                    url: 'https://university.redis.com/certificates/2f80fd960a474938b424a41d11ee0e95' }
    ],
    'ClickHouse': [
      { name: 'ClickHouse Developer',                       tag: 'Full Stack', date: 'Jun 2024',                    url: 'https://www.credly.com/badges/59159e3c-3aff-4d6f-bca5-bd5f27d87292/linked_in_profile' }
    ],
    'MongoDB': [
      { name: 'Building GenAI Apps',                        tag: 'Agent',      date: 'Jan 2026',                    url: 'https://learn.mongodb.com/c/fUMOE2I2SgOfIxTHUh9PCA' }
    ]
  };

  let allCerts = [...featured];
  let idCounter = 1;

  for (const [authority, items] of Object.entries(categories)) {
    for (const item of items) {
      allCerts.push({
        id: `cert-${idCounter++}`,
        name: item.name,
        tag: item.tag,
        authority,
        class: '',
        date: item.date,
        url: item.url
      });
    }
  }

  // Filter state — counts derived from real LinkedIn data (CCNA + Ethical Hacker featured count under CISCO)
  const TABS = ['ALL 33', 'CISCO 7', 'AWS 2', 'MICROSOFT 1', 'HPE 2', 'HACKERRANK 6', 'OTHER'];
  let activeTab = $state('ALL 33');

  function setTab(tab) {
    activeTab = tab;
    currentPage = 1;
  }

  let filteredCerts = $derived.by(() => {
    if (activeTab === 'ALL 33') return allCerts;
    const key = activeTab.split(' ')[0]; // CISCO, AWS, etc.
    if (key === 'OTHER') {
      const mainAuths = ['Cisco', 'AWS', 'Microsoft', 'HPE', 'HackerRank'];
      return allCerts.filter(c => !mainAuths.includes(c.authority));
    }
    return allCerts.filter(c => c.authority.toUpperCase() === key);
  });

  // Pagination state
  const ITEMS_PER_PAGE = 8;
  let currentPage = $state(1);
  let totalPages = $derived(Math.ceil(filteredCerts.length / ITEMS_PER_PAGE));
  let paginatedCerts = $derived(filteredCerts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));

  // Verify interaction state
  // Using Svelte 5 deeply reactive objects
  let verifyState = $state({}); // {[id]: { status: 'idle' | 'querying' | 'validating' | 'verified', text: string }}

  let isModalOpen = $state(false);
  let activeCertImage = $state(null);
  let activeCertName = $state('');

  function closeImageModal() {
    isModalOpen = false;
    setTimeout(() => {
      activeCertImage = null;
      activeCertName = '';
    }, 300);
  }

  $effect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeImageModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  });

  async function handleVerify(cert) {
    if (!verifyState[cert.id]) {
      verifyState[cert.id] = { status: 'idle', text: '' };
    }

    const state = verifyState[cert.id];

    if (state.status === 'verified') {
      // If already verified, clicking it acts as a link out or opens modal
      if (cert.image) {
        activeCertImage = cert.image;
        activeCertName = cert.name;
        isModalOpen = true;
      } else if (cert.url) {
        window.open(cert.url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (state.status !== 'idle') return; // already in progress

    state.status = 'querying';
    state.text = 'QUERYING AUTHORITY...';
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 700));
    
    state.status = 'validating';
    state.text = 'VALIDATING TOKEN...';
    
    // Simulate compute/crypto delay
    await new Promise(r => setTimeout(r, 900));
    
    state.status = 'verified';
    state.text = '✓ CLEARANCE CONFIRMED';

    // Open link automatically
    setTimeout(() => {
      if (cert.image) {
        activeCertImage = cert.image;
        activeCertName = cert.name;
        isModalOpen = true;
      } else if (cert.url) {
        window.open(cert.url, '_blank', 'noopener,noreferrer');
      }
    }, 500);
  }

  function getButtonText(cert) {
    const s = verifyState[cert.id];
    if (!s || s.status === 'idle') return '[ VERIFY CLEARANCE ]';
    if (s.status === 'verified') {
      if (cert.image) return '[ VIEW CERTIFICATE ]';
      if (cert.url) return '[↗ VIEW CREDENTIAL]';
      return '[✓ NO PUBLIC LINK]';
    }
    return s.text;
  }
</script>

<section id="certifications" class="certs-section reveal-item fade-up" use:reveal>
  <header class="section-header">
    <h2 class="section-id">▸ 05 // SECURITY CLEARANCES</h2>
    <div class="header-line"></div>
  </header>

  <div class="filter-tabs">
    {#each TABS as tab}
      <button 
        class="tab-btn {activeTab === tab ? 'active' : ''}" 
        onclick={() => setTab(tab)}
      >
        [{tab}]
      </button>
    {/each}
  </div>

  {#key currentPage}
    <div class="certs-grid">
      {#each paginatedCerts as cert (cert.id)}
        {@const vState = verifyState[cert.id] || { status: 'idle' }}
        <div class="reveal-item fade-up stagger-1" use:reveal>
          <div 
            class="panel cert-card {cert.class} {vState.status === 'verified' ? 'verified-pulse' : ''} {vState.status === 'querying' || vState.status === 'validating' ? 'scanning-card' : ''} pulse-border border-{cert.tag.replace(' ', '-').toLowerCase()}" 
          >
            <!-- Scanning Laser overlay -->
            {#if vState.status === 'querying' || vState.status === 'validating'}
              <div class="scan-laser"></div>
            {/if}

            <div class="cert-header">
              <span class="cert-authority text-cyan">{cert.authority}</span>
              <span class="cert-tag tag-{cert.tag.replace(' ', '-').toLowerCase()}">{cert.tag}</span>
            </div>

            <h3 class="cert-name text-primary" title={cert.name}>{cert.name}</h3>

            <div class="cert-date text-dim">{cert.date}</div>

            <button
              class="verify-btn {vState.status}"
              onclick={() => handleVerify(cert)}
              disabled={vState.status === 'querying' || vState.status === 'validating'}
            >
              {getButtonText(cert)}
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/key}

  {#if totalPages > 1}
    <div class="pagination-controls reveal-item fade-up" use:reveal>
      <button 
        class="page-nav-btn" 
        disabled={currentPage === 1}
        onclick={() => currentPage -= 1}
        aria-label="Previous Page"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="square" stroke-linejoin="miter">
          <polyline points="15 18 9 12 15 6"></polyline>
          <line x1="9" y1="12" x2="19" y2="12" stroke-dasharray="2 4"></line>
        </svg>
      </button>
      
      <div class="page-indicators">
        {#each Array(totalPages) as _, i}
          <button 
            class="page-dot {currentPage === i + 1 ? 'active' : ''}"
            onclick={() => currentPage = i + 1}
            aria-label="Page {i + 1}"
          ></button>
        {/each}
      </div>

      <button 
        class="page-nav-btn" 
        disabled={currentPage === totalPages}
        onclick={() => currentPage += 1}
        aria-label="Next Page"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="square" stroke-linejoin="miter">
          <polyline points="9 18 15 12 9 6"></polyline>
          <line x1="15" y1="12" x2="5" y2="12" stroke-dasharray="2 4"></line>
        </svg>
      </button>
    </div>
  {/if}
</section>

{#if isModalOpen}
  <div class="modal-overlay">
    <button
      class="modal-dismiss"
      type="button"
      onclick={closeImageModal}
      aria-label="Close certificate preview"
    ></button>
    <div class="modal-content" role="dialog" aria-modal="true" aria-label={activeCertName}>
      <button class="close-modal-btn" type="button" onclick={closeImageModal}>[ CLOSE ]</button>
      <div class="modal-image-wrapper">
        <!-- svelte-ignore a11y_missing_attribute -->
        <img src={activeCertImage} alt={activeCertName} />
      </div>
      <div class="modal-footer">
        <span class="text-cyan">{activeCertName}</span>
      </div>
    </div>
  </div>
{/if}

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

  .filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }

  .tab-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: var(--space-1) var(--space-2);
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }

  .tab-btn:hover {
    color: var(--text-primary);
  }

  .tab-btn.active {
    color: var(--cyan);
    border-bottom: 2px solid var(--cyan);
    text-shadow: 0 0 10px var(--cyan-glow);
  }

  .certs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  /* Pagination UI */
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-4);
    margin-top: var(--space-6);
    padding-top: var(--space-4);
    border-top: 1px dashed var(--border-subtle);
  }

  .page-nav-btn {
    background: transparent;
    border: none;
    color: var(--cyan);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    cursor: pointer;
    letter-spacing: 0.1em;
    padding: var(--space-2);
    transition: all 0.2s;
  }

  .page-nav-btn:disabled {
    color: var(--text-muted);
    cursor: not-allowed;
    opacity: 0.5;
  }

  .page-nav-btn:not(:disabled):hover {
    text-shadow: 0 0 8px var(--cyan-glow);
  }

  .page-indicators {
    display: flex;
    gap: var(--space-2);
  }

  .page-dot {
    width: 32px;
    height: 4px;
    background: var(--border);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .page-dot:hover {
    background: var(--border-active);
  }

  .page-dot.active {
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan-glow);
  }

  .cert-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-height: 200px;
    transition: transform 0.2s var(--ease), border-color 0.2s ease, box-shadow 0.2s;
  }

  .cert-card:hover {
    transform: translateY(-2px);
  }

  /* Structural Colors */
  .text-cyan { color: var(--cyan); }
  .text-dim { color: var(--dim); }
  .text-primary { color: var(--text-primary); }

  .cert-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    min-height: 22px;
  }

  .cert-authority {
    font-weight: bold;
    letter-spacing: 0.05em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .cert-tag {
    font-size: 0.60rem;
    padding: 2px 6px;
    border-radius: 2px;
    background: var(--panel-inset);
    border: 1px solid var(--border-subtle);
    font-weight: bold;
    letter-spacing: 0.05em;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .cert-date {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: -2px;
  }

  .tag-cloud { color: var(--cyan); border-color: var(--cyan-border); background: var(--cyan-glow); }
  .tag-networking { color: var(--green); border-color: var(--green-border); background: var(--green-glow); }
  .tag-agent { color: var(--purple); border-color: var(--border-subtle); background: rgba(187, 134, 252, 0.1); }
  .tag-full-stack { color: var(--amber); border-color: var(--border-subtle); background: rgba(255, 179, 0, 0.1); }

  .cert-name {
    font-family: var(--font-display);
    font-size: 1.05rem;
    margin: 0;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: calc(1.3em * 2);
  }

  /* Interaction Button */
  .verify-btn {
    margin-top: auto;
    background: var(--panel-inset);
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.70rem;
    padding: var(--space-2);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    width: 100%;
    letter-spacing: 0.05em;
  }

  .verify-btn:hover:not(:disabled) {
    background: var(--border-subtle);
    color: var(--text-bright);
    border-color: var(--border-active);
  }

  .verify-btn.querying {
    color: var(--amber);
    animation: blink 1s infinite alternate;
  }

  .verify-btn.validating {
    color: var(--cyan);
    animation: blink 0.5s infinite alternate;
  }

  .verify-btn.verified {
    background: var(--green-glow);
    border-color: var(--green);
    color: var(--green);
    text-shadow: 0 0 8px rgba(0,255,136,0.4);
  }

  @keyframes blink {
    from { opacity: 0.6; }
    to { opacity: 1; }
  }

  /* Special Spotlights */
  .pulse-border {
    animation: borderPulse 3s infinite;
  }
  @keyframes borderPulse {
    0% { border-color: var(--border); box-shadow: none; }
    50% { border-color: var(--cyan); box-shadow: 0 0 15px rgba(0, 255, 200, 0.4); }
    100% { border-color: var(--border); box-shadow: none; }
  }

  /* Tag-based Left Border Accents */
  .border-cloud {
    border-left: 3px solid var(--cyan) !important;
  }
  .border-networking {
    border-left: 3px solid var(--green) !important;
  }
  .border-agent {
    border-left: 3px solid var(--purple) !important;
  }
  .border-full-stack {
    border-left: 3px solid var(--amber) !important;
  }
  .border-other {
    border-left: 3px solid var(--text-muted) !important;
  }

  .verified-pulse {
    border-color: var(--green) !important;
    animation: greenFlash 1s ease-out;
  }

  @keyframes greenFlash {
    0% { box-shadow: 0 0 40px var(--green); }
    100% { box-shadow: 0 0 10px transparent; }
  }

  .scanning-card {
    position: relative;
    overflow: hidden;
    border-color: var(--cyan);
    box-shadow: 0 0 15px var(--cyan-glow);
  }

  .scan-laser {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan), 0 0 20px var(--cyan);
    animation: scan 1.6s ease-in-out infinite alternate;
    z-index: 10;
  }

  @keyframes scan {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  /* Certificate Image Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-4);
    animation: fadeIn 0.3s ease-out forwards;
  }

  .modal-dismiss {
    position: absolute;
    inset: 0;
    border: none;
    background: rgba(10, 15, 20, 0.85);
    backdrop-filter: blur(8px);
    cursor: pointer;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    position: relative;
    z-index: 1;
    background: var(--panel);
    border: 1px solid var(--border-active);
    box-shadow: 0 10px 40px rgba(0, 255, 200, 0.1);
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .close-modal-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-family: var(--font-mono);
    cursor: pointer;
    font-size: var(--text-label);
    transition: color 0.2s;
  }
  
  .close-modal-btn:hover {
    color: var(--cyan);
  }

  .modal-image-wrapper {
    flex-grow: 1;
    overflow: auto;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-image-wrapper img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    display: block;
    background: #ffffff;
    padding: var(--space-2);
    border-radius: 2px;
  }

  .modal-footer {
    padding: var(--space-3);
    border-top: 1px dashed var(--border-subtle);
    font-family: var(--font-mono);
    font-size: var(--text-micro);
    text-align: center;
  }
</style>
