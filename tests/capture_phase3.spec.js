import { test, expect } from '@playwright/test';

test.skip(!process.env.CAPTURE_PHASE3, 'Manual screenshot helper');

test('capture phase 3 screenshots', async ({ page }, testInfo) => {
  await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
  await page.goto('/');
  await expect(page.locator('.layout-wrapper')).toBeVisible();

  const captures = [
    { button: 'STATUS', file: 'phase3-status.png' },
    { button: 'ABOUT', file: 'phase3-about.png' },
    { button: 'PROJECTS', file: 'phase3-projects.png' },
    { button: 'CERTS', file: 'phase3-certs.png' },
    { button: 'CONTACT', file: 'phase3-contact.png' }
  ];

  for (const capture of captures) {
    await page.getByRole('button', { name: capture.button }).click();
    await page.screenshot({ path: testInfo.outputPath(capture.file), fullPage: true });
  }
});
