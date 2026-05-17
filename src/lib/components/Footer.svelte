<script>
  let year = new Date().getFullYear();

  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/sruthik27',
      // simple-icons github mark
      path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sruthik-issac/',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    {
      name: 'Email',
      href: 'mailto:sruthik2016@gmail.com',
      path: 'M1.5 4h21A1.5 1.5 0 0 1 24 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 18.5v-13A1.5 1.5 0 0 1 1.5 4Zm.5 2.732V18h20V6.732l-10 6.25-10-6.25Zm.32-.732L12 12.382 21.68 6H2.32Z'
    },
    {
      name: 'dev.to',
      href: 'https://dev.to/sruthik_issac',
      path: 'M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z'
    }
  ];
</script>

<footer class="footer-meta panel">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-label">SYS_VERSION</div>
      <div class="footer-value">v1.4.0-stable</div>
    </div>
    <div class="footer-col">
      <div class="footer-label">LAST_UPDATE</div>
      <div class="footer-value">13-MAY-2026</div>
    </div>
    <div class="footer-col">
      <div class="footer-label">COPYRIGHT</div>
      <div class="footer-value">&copy; {year} NOC SYSTEMS</div>
    </div>

    <div class="footer-col footer-socials">
      <div class="footer-label">CONNECT</div>
      <div class="socials-row">
        {#each socials as s}
          <a
            class="social-link"
            href={s.href}
            target={s.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={s.name}
            title={s.name}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d={s.path} />
            </svg>
          </a>
        {/each}
      </div>
    </div>

    <div class="footer-col right-align">
      <div class="footer-signature">
        DESIGNED && ENGINEERED BY<br/>
        <span class="sign-name">SRUTHIK ISSAC</span>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-meta {
    margin: var(--space-6) 0 var(--space-4) 0;
    padding: var(--space-4);
    border-top: 1px solid var(--border);
    background: var(--panel-inset);
    position: relative;
    overflow: hidden;
  }

  .footer-meta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    opacity: 0.3;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--space-4);
    align-items: center;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .right-align {
    text-align: right;
    justify-content: center;
  }

  .footer-label {
    font-size: 0.65rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
  }

  .footer-value {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-family: var(--font-mono);
  }

  .footer-signature {
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    line-height: 1.4;
  }

  .sign-name {
    font-size: 0.8rem;
    color: var(--cyan);
    font-weight: bold;
    letter-spacing: 0.1em;
  }

  /* ── Social icons ── */
  .socials-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: 1px solid var(--border-subtle);
    border-radius: 4px;
    color: var(--text-muted);
    background: rgba(0, 212, 255, 0.02);
    transition: color 0.18s var(--ease), border-color 0.18s var(--ease),
                background 0.18s var(--ease), transform 0.18s var(--ease),
                box-shadow 0.18s var(--ease);
  }

  .social-link:hover,
  .social-link:focus-visible {
    color: var(--cyan);
    border-color: var(--cyan);
    background: rgba(0, 212, 255, 0.08);
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.18);
    transform: translateY(-1px);
    outline: none;
  }

  .social-link svg {
    display: block;
  }

  @media (max-width: 768px) {
    .right-align {
      text-align: left;
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }

    .footer-socials {
      grid-column: span 2;
    }
  }

  @media (max-width: 420px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .footer-socials {
      grid-column: span 1;
    }
  }
</style>
