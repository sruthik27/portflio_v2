import { test, expect } from '@playwright/test';

test.describe('Interactions and production safeguards', () => {
  test('boot sequence can be skipped and stays skipped for the session', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();

    const skipButton = page.getByRole('button', { name: /Skip boot sequence/i });
    await expect(skipButton).toBeVisible();

    await skipButton.click();
    await expect(page.locator('.boot-overlay')).toBeHidden({ timeout: 2000 });

    await page.reload();
    await expect(page.locator('.boot-overlay')).toHaveCount(0);
    await expect(page.locator('.layout-wrapper')).toBeVisible();
  });

  test('switching sections does not trigger runtime page errors', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];

    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
    await page.goto('/');

    await page.getByRole('button', { name: 'ABOUT' }).click();
    await expect(page.locator('#about .section-tag').first()).toBeVisible();

    await page.getByRole('button', { name: 'PROJECTS' }).click();
    await expect(page.getByRole('heading', { name: '§ 04 // DEPLOYMENT REGISTRY' }).first()).toBeVisible();

    await page.getByRole('button', { name: 'CONTACT' }).click();
    await expect(page.getByRole('heading', { name: '§ 08 // ESTABLISH CONNECTION' }).first()).toBeVisible();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test('command palette navigates to the requested view', async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
    await page.goto('/');

    await page.evaluate(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
    });
    const input = page.getByPlaceholder('Type a command or search...');
    await expect(input).toBeVisible();

    await input.fill('contact');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: '§ 08 // ESTABLISH CONNECTION' }).first()).toBeVisible();
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('mobile nav exposes all primary views', async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
    await page.goto('/');

    const mobileNav = page.getByRole('navigation', { name: 'Mobile Navigation' });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole('button', { name: /WORK/i }).click();
    await expect(page.getByRole('heading', { name: '§ 04 // DEPLOYMENT REGISTRY' }).first()).toBeVisible();

    await mobileNav.getByRole('button', { name: /CONTACT/i }).click();
    await expect(page.getByRole('heading', { name: '§ 08 // ESTABLISH CONNECTION' }).first()).toBeVisible();
  });
});
