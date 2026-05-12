import { test, expect } from '@playwright/test';

async function bootIntoApp(page) {
  await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
  await page.goto('/');
  await expect(page.locator('.layout-wrapper')).toBeVisible();
}

test.describe('Revisions', () => {
  test.beforeEach(async ({ page }) => {
    await bootIntoApp(page);
  });

  test('Experience bullets are collapsed by default and toggle on click', async ({ page }) => {
    await page.getByRole('button', { name: 'EXPERIENCE' }).click();
    await expect(page.getByRole('heading', { name: '▸ 03 // CHANGE MANAGEMENT LOG' }).first()).toBeVisible();

    // Action bullets must be hidden by default
    const bulletText = page.getByText(/Owning end-to-end production features/);
    await expect(bulletText).toBeHidden();

    // Use a stable locator that doesn't depend on button text (which changes on toggle)
    const fteToggle = page.locator('button[aria-controls="actions-CHANGE-0002"]');
    await expect(fteToggle).toBeVisible();
    await expect(fteToggle).toHaveAttribute('aria-expanded', 'false');
    await fteToggle.click();
    await expect(fteToggle).toHaveAttribute('aria-expanded', 'true');

    // Bullets visible after expand
    await expect(bulletText.first()).toBeVisible();

    // No tech-tag pills should be rendered (we removed them since they were assumptions)
    await expect(page.locator('#actions-CHANGE-0002 .tech-tag')).toHaveCount(0);

    // Re-click collapses
    await fteToggle.click();
    await expect(fteToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Topbar ticker shows real GitHub metrics', async ({ page }) => {
    const ticker = page.locator('.topbar__ticker');
    await expect(ticker).toContainText('GH_REPOS');
    await expect(ticker).toContainText('18 PUBLIC');
    await expect(ticker).toContainText('sruthik27');
    await expect(ticker).toContainText('LATEST_PUSH');
    await expect(ticker).toContainText('marginalia-desktop');
  });

  test('Topbar ticker no longer mentions "OPEN TO OPPORTUNITIES"', async ({ page }) => {
    const ticker = page.locator('.topbar__ticker');
    await expect(ticker).not.toContainText('OPEN TO OPPORTUNITIES');
    await expect(ticker).not.toContainText('OPEN TO');
  });

  test('Hero role line says "HPE NETWORKING" not "HPE ARUBA NETWORKING"', async ({ page }) => {
    const role = page.locator('.hero__role');
    await expect(role).toBeVisible();
    await expect(role).toContainText('HPE NETWORKING');
    await expect(role).not.toContainText('ARUBA');
  });

  test('About section says "HPE Networking" not "HPE Aruba Networking"', async ({ page }) => {
    await page.getByRole('button', { name: 'ABOUT' }).click();
    const about = page.locator('#about');
    await expect(about).toContainText('HPE Networking');
    // No mention of "Aruba Networking" string anywhere in the About panel
    await expect(about).not.toContainText('Aruba Networking');
  });

  test('Hero Active Threads reverted to original wording', async ({ page }) => {
    await expect(page.getByText('AI-powered network troubleshooting for self-driving networks')).toBeVisible();
    await expect(page.getByText('RAG pipelines, LangGraph agents, MCP servers & n8n workflows')).toBeVisible();
    await expect(page.getByText('Vibe coding, LLM-powered automation & Infrastructure as Code')).toBeVisible();
  });

  test('About section is short — no longer 4-paragraph LinkedIn blurb', async ({ page }) => {
    await page.getByRole('button', { name: 'ABOUT' }).click();
    const blurb = page.locator('.about-blurb');
    await expect(blurb).toBeVisible();
    const paragraphs = blurb.locator('.about-blurb__para');
    // Should be ≤ 2 short paragraphs
    await expect(paragraphs).toHaveCount(2);
    // Confirm the LinkedIn-specific verbatim text is gone
    await expect(page.getByText(/driven by the challenge of making complex infrastructure smarter/)).toHaveCount(0);
  });

});

test.describe('Boot sequence revisions', () => {
  // Fresh context so beforeEach's session-skip init script doesn't apply.
  test('Boot sequence no longer mentions "Connecting to HPE Aruba node"', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto('/');

    const overlay = page.locator('.boot-overlay');
    await expect(overlay).toBeVisible();
    // Wait for all boot lines to render (~2 seconds for the staggered reveal)
    await page.waitForTimeout(2500);
    await expect(overlay).not.toContainText(/Connecting to HPE Aruba node/);
    await ctx.close();
  });
});
