// Debug helper: screenshots the print-emulated /resume page to a PNG so we can
// see what the PDF will look like.
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const preview = spawn('npx', ['vite', 'preview', '--port', '4174', '--host', '127.0.0.1'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe']
});

await new Promise((r) => {
  preview.stdout.on('data', (c) => {
    process.stdout.write(c);
    if (c.toString().includes('Local')) r();
  });
});

try {
  const browser = await chromium.launch();
  // A4 at 96 dpi = 794 × 1123
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto('http://127.0.0.1:4174/resume');
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  // Take a full-page screenshot to see total height
  await page.screenshot({ path: resolve(root, 'static/_resume-debug.png'), fullPage: true });
  // Also measure scroll height vs viewport height
  const m = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
    resumeHeight: document.querySelector('.resume')?.getBoundingClientRect().height,
    bodyHeight: document.body.getBoundingClientRect().height
  }));
  console.log('METRICS:', JSON.stringify(m, null, 2));
  console.log('A4 pages ≈', (m.scrollHeight / 1123).toFixed(2));
  await browser.close();
} finally {
  preview.kill('SIGTERM');
}
