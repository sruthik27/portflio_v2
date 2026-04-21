import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 1440, height: 900 }
    });

    try {
        const response = await page.goto('http://localhost:5173', { timeout: 10000 });
        console.log(`Page status: ${response?.status()}`);
        await page.waitForTimeout(4000);

        await page.locator('#projects').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: '/Users/sruthiki/.gemini/antigravity/brain/35433749-7e36-4806-8c1e-98f4384e958d/phase3_projects.png' });

        await page.locator('#syslog').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: '/Users/sruthiki/.gemini/antigravity/brain/35433749-7e36-4806-8c1e-98f4384e958d/phase3_syslog.png' });

        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(2000); // wait for trace
        await page.screenshot({ path: '/Users/sruthiki/.gemini/antigravity/brain/35433749-7e36-4806-8c1e-98f4384e958d/phase3_contact.png' });

        await page.screenshot({ path: '/Users/sruthiki/.gemini/antigravity/brain/35433749-7e36-4806-8c1e-98f4384e958d/phase3_debug.png', fullPage: true });

        console.log("Screenshots saved.");
    } catch (err) {
        console.error(err);
    }

    await browser.close();
})();
