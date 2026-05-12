<script>
  let year = new Date().getFullYear();
</script>

<footer class="footer-meta panel">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-label">SYS_VERSION</div>
      <div class="footer-value">v1.4.0-stable</div>
    </div>
    <div class="footer-col">
      <div class="footer-label">LAST_UPDATE</div>
      <div class="footer-value">11-MAY-2026</div>
    </div>
    <div class="footer-col">
      <div class="footer-label">COPYRIGHT</div>
      <div class="footer-value">&copy; {year} NOC SYSTEMS</div>
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
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-4);
    align-items: center;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
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

  @media (max-width: 768px) {
    .right-align {
      text-align: left;
    }
    
    .footer-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
