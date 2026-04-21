<script>
  import { activeSection } from '$lib/stores.svelte.js';
  import { cubicOut, quintOut } from 'svelte/easing';
  
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import AboutSection from '$lib/components/sections/AboutSection.svelte';
  import DomainArchitectureSection from '$lib/components/sections/DomainArchitectureSection.svelte';
  import ExperienceSection from '$lib/components/sections/ExperienceSection.svelte';
  import ProjectsSection from '$lib/components/sections/ProjectsSection.svelte';
  import CertificationsSection from '$lib/components/sections/CertificationsSection.svelte';
  import EducationSection from '$lib/components/sections/EducationSection.svelte';
  import ContactSection from '$lib/components/sections/ContactSection.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // Hologram materialization & glitch transition
  function cyberWarp(node, { duration = 800, delay = 0, isOut = false }) {
    return {
      duration,
      delay,
      easing: isOut ? cubicOut : quintOut,
      css: t => {
        const u = 1 - t;
        if (isOut) {
          // Exit: rapid upward dissolve
          return `
            opacity: ${t};
            transform: translateY(${u * -40}px) scale(${1 - u * 0.05});
            filter: blur(${u * 10}px) opacity(${t});
          `;
        }
        
        // Enter: holographic wipe down with chromatic aberration blink
        const isGlitch = t > 0.1 && t < 0.3;
        const aberration = isGlitch ? 'drop-shadow(4px 0 0 rgba(255,0,0,0.8)) drop-shadow(-4px 0 0 rgba(0,255,255,0.8))' : '';
        const glow = `drop-shadow(0 0 ${u * 20}px rgba(0, 255, 200, ${u * 0.5}))`;
        
        return `
          opacity: ${t};
          transform: translateY(${u * 40}px) scale(${0.95 + 0.05 * t});
          filter: blur(${u * 8}px) contrast(${100 + u * 50}%) brightness(${100 + u * 20}%) ${aberration} ${glow};
          clip-path: polygon(0 0, 100% 0, 100% ${t * 100}%, 0 ${t * 100}%);
        `;
      }
    };
  }
</script>

<svelte:head>
  <title>SRUTHIK ISSAC — Cloud Engineer | NOC Portfolio</title>
  <meta name="description" content="Sruthik Issac — Cloud Engineer at Hewlett Packard Enterprise, Aruba Networks. AWS Solutions Architect, CCNA certified. NOC-style interactive portfolio." />
  <meta name="author" content="Sruthik Issac" />
  <meta property="og:title" content="SRUTHIK ISSAC — Cloud Engineer | NOC Portfolio" />
  <meta property="og:description" content="Cloud Engineer at HPE Aruba Networks. AWS SAA · CCNA · 34 certifications. Interactive NOC-style command center portfolio." />
  <meta property="og:type" content="website" />
  <meta name="theme-color" content="#040710" />
</svelte:head>

<div class="view-stage">
  {#key activeSection.value}
    <!-- Ensure exit transition resolves quickly before enter finishes -->
    <div 
      class="view-container"
      in:cyberWarp={{ duration: 800, delay: 100 }}
      out:cyberWarp={{ duration: 400, isOut: true }}
    >
      {#if activeSection.value === 'hero'}
        <HeroSection />
      {:else if activeSection.value === 'about'}
        <AboutSection />
      {:else if activeSection.value === 'domains'}
        <DomainArchitectureSection />
      {:else if activeSection.value === 'experience'}
        <ExperienceSection />
      {:else if activeSection.value === 'projects'}
        <ProjectsSection />
      {:else if activeSection.value === 'certs'}
        <CertificationsSection />
      {:else if activeSection.value === 'education'}
        <EducationSection />
      {:else if activeSection.value === 'contact'}
        <ContactSection />
      {/if}
      
      <Footer />
    </div>
  {/key}
</div>

<style>
  .view-stage {
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--topbar-height) - 45px); /* space for both navbars */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .view-container {
    grid-area: 1 / 1; /* stack the animating views directly on top of each other */
    width: 100%;
    padding-bottom: var(--space-8);
  }
</style>
