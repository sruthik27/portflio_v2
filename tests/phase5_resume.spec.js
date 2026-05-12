import { test, expect } from '@playwright/test';

test.describe('Resume export', () => {
  test('Export button on TopBar links to /resume?print=1 in a new tab', async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
    await page.goto('/');

    const topbar = page.locator('.topbar');
    const exportLink = topbar.getByRole('link', { name: /Export resume as PDF/i });
    await expect(exportLink).toBeVisible();
    await expect(exportLink).toHaveAttribute('href', '/resume?print=1');
    await expect(exportLink).toHaveAttribute('target', '_blank');
  });

  test('/resume renders the resume document with all expected sections', async ({ page }) => {
    await page.goto('/resume');
    await expect(page).toHaveTitle(/Sruthik Issac.*Resume/i);

    const resume = page.locator('.resume');
    await expect(resume).toBeVisible();

    // Header
    await expect(page.locator('.resume__name')).toContainText('SRUTHIK ISSAC');
    await expect(page.locator('.resume__title')).toContainText('Cloud & Network Engineer');
    await expect(page.locator('.resume__contact')).toContainText('sruthik2016@gmail.com');
    await expect(page.locator('.resume__contact')).toContainText('linkedin.com/in/sruthik-issac');
    await expect(page.locator('.resume__contact')).toContainText('github.com/sruthik27');

    // Sections (rendered as h2). Summary was dropped to fit the single-page constraint.
    for (const title of ['Experience', 'Selected Projects', 'Education', 'Skills', 'Certifications']) {
      await expect(page.getByRole('heading', { level: 2, name: new RegExp(`^${title}`, 'i') })).toBeVisible();
    }

    // Experience entries
    await expect(page.locator('.resume__company')).toContainText('Hewlett Packard Enterprise');
    await expect(page.getByText(/Cloud Engineer · HPE Networking/).first()).toBeVisible();
    await expect(page.getByText(/Cloud Developer Intern · HPE Networking/)).toBeVisible();

    // Education
    await expect(page.getByText(/Thiagarajar College of Engineering/)).toBeVisible();
    await expect(page.getByText(/CGPA: 9\.0 \/ 10/)).toBeVisible();

    // At least one project
    await expect(page.locator('.proj-name', { hasText: 'Marginalia' })).toBeVisible();
    await expect(page.locator('.proj-name', { hasText: 'Plexus' })).toBeVisible();

    // Selected certs visible (terse single-line labels — see resume page)
    await expect(page.getByText(/AWS Solutions Architect/)).toBeVisible();
    await expect(page.getByText(/Cisco CCNA/)).toBeVisible();
  });

  test('/resume does NOT render portfolio chrome', async ({ page }) => {
    await page.goto('/resume');

    // Chrome elements must be absent
    await expect(page.locator('.topbar')).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Main Navigation' })).toHaveCount(0);
    await expect(page.locator('.boot-overlay')).toHaveCount(0);
    await expect(page.getByText('SYS TELEMETRY')).toHaveCount(0);

    // But the resume-toolbar should be there
    await expect(page.locator('.resume-toolbar')).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to portfolio/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Download PDF/ })).toBeVisible();
  });

  test('/resume?print=1 auto-triggers window.print()', async ({ page }) => {
    // Intercept print before navigation.
    await page.addInitScript(() => {
      window.__printCalls = 0;
      const originalPrint = window.print;
      window.print = () => {
        window.__printCalls = (window.__printCalls || 0) + 1;
        // Don't actually open the dialog in tests.
      };
    });

    await page.goto('/resume?print=1');
    await expect(page.locator('.resume')).toBeVisible();

    // The page schedules print on a small timeout; poll briefly.
    await expect.poll(async () => await page.evaluate(() => window.__printCalls), { timeout: 5000 }).toBeGreaterThanOrEqual(1);
  });

  test('CommandPalette has Export Resume as PDF command', async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
    await page.goto('/');

    await page.evaluate(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    });

    const input = page.getByPlaceholder('Type a command or search...');
    await expect(input).toBeVisible();
    await input.fill('resume');

    await expect(page.getByText('Export Resume as PDF')).toBeVisible();
    await expect(page.getByText('View Resume')).toBeVisible();
  });
});
