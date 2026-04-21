import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Log console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error));

    try {
        console.log('Navigating to localhost:4173...');
        await page.goto('http://localhost:4173/');

        await page.waitForTimeout(500); // Wait for boot screen
        console.log('Clicking skip...');
        await page.getByRole('button', { name: /Skip Boot Sequence/i }).click();

        console.log('Waiting 2 seconds for Three.js import & rendering...');
        await page.waitForTimeout(2000);

        console.log('Taking screenshot...');
        await page.screenshot({ path: 'particle-bg-debug.png' });

        const hasCanvas = await page.locator('.particle-bg canvas').count();
        console.log(`Canvas count: ${hasCanvas}`);

    } catch (e) {
        console.error('Test script error:', e);
    } finally {
        await browser.close();
    }
})();
