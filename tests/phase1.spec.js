import { test, expect } from '@playwright/test';

async function bootIntoApp(page) {
  await page.addInitScript(() => window.sessionStorage.setItem('booted', '1'));
  await page.goto('/');
  await expect(page.locator('.layout-wrapper')).toBeVisible();
}

test.describe('Core app shell', () => {
  test.beforeEach(async ({ page }) => {
    await bootIntoApp(page);
  });

  test('renders the title, top bar, and active STATUS tab', async ({ page }) => {
    await expect(page).toHaveTitle(/SRUTHIK ISSAC/);
    await expect(page.getByText('SRUTHIK.ISSAC')).toBeVisible();
    await expect(page.getByText('ONLINE')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main Navigation' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'STATUS' })).toHaveClass(/topnav__btn--active/);
  });

  test('shows the hero overview by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'SRUTHIK ISSAC' })).toBeVisible();
    await expect(page.getByText('PROUD CLOUD & NETWORK ENGINEER')).toBeVisible();
    await expect(page.locator('.hero__stats')).toContainText('EXPERIENCE');
    await expect(page.locator('.hero__stats')).toContainText('34 ACTIVE');
    await expect(page.locator('.hero__stats')).toContainText('9 SYSTEMS');
    await expect(page.getByText('wake me up for a tour')).toBeVisible();
  });

  test('switches to the about view and exposes profile links', async ({ page }) => {
    await page.getByRole('button', { name: 'ABOUT' }).click();

    await expect(page.locator('#about .section-tag').first()).toBeVisible();
    await expect(page.getByText('root@career_os:~$ systeminfo').first()).toBeVisible();
    await expect(page.getByText('Sruthik Issac').first()).toBeVisible();

    const linkedin = page.getByRole('link', { name: /linkedin.com\/in\/sruthik-issac/i }).first();
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute('href', /linkedin\.com/);
  });

  test('switches to projects and contact views with working outbound links', async ({ page }) => {
    await page.getByRole('button', { name: 'PROJECTS' }).click();
    await expect(page.getByRole('heading', { name: '§ 04 // DEPLOYMENT REGISTRY' }).first()).toBeVisible();
    await expect(page.getByText('SyncRoom').first()).toBeVisible();

    const sourceLink = page.getByRole('link', { name: /SOURCE/i }).first();
    await expect(sourceLink).toHaveAttribute('href', /github\.com/);

    await page.getByRole('button', { name: 'CONTACT' }).click();
    await expect(page.getByRole('heading', { name: '§ 08 // ESTABLISH CONNECTION' }).first()).toBeVisible();
    await expect(page.getByText('PRIMARY EMAIL').first()).toBeVisible();

    const emailLink = page.getByRole('link', { name: /\[→ CONNECT\]/i }).first();
    await expect(emailLink).toHaveAttribute('href', /^mailto:/);
  });
});
