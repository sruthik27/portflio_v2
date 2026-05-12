// Renders /resume to a real PDF binary, saved to static/Sruthik_Issac_Resume.pdf.
// Usage:  npm run resume:pdf    (after `npm run build`)
//
// The Export button in the portfolio downloads this PDF directly — one click,
// no print dialog. Re-run this script after editing resume content.

import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = resolve(root, 'build');
const outPath = resolve(root, 'static/Sruthik_Issac_Resume.pdf');

if (!existsSync(buildDir)) {
  console.error('✖ No build/ directory found. Run `npm run build` first.');
  process.exit(1);
}

const preview = spawn('npx', ['vite', 'preview', '--port', '4173', '--host', '127.0.0.1'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe']
});

const readyPromise = new Promise((resolveReady, rejectReady) => {
  const timer = setTimeout(() => rejectReady(new Error('Preview server did not start within 20s')), 20000);
  preview.stdout.on('data', (chunk) => {
    const out = chunk.toString();
    process.stdout.write(out);
    if (out.includes('Local')) {
      clearTimeout(timer);
      resolveReady();
    }
  });
  preview.stderr.on('data', (chunk) => process.stderr.write(chunk));
});

try {
  await readyPromise;
  console.log('\n▸ Rendering /resume → PDF…');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:4173/resume', { waitUntil: 'networkidle' });
  if (typeof page.evaluate === 'function') {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  }
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log(`✔ Resume PDF generated → ${outPath}`);
} catch (err) {
  console.error('✖ PDF generation failed:', err);
  process.exitCode = 1;
} finally {
  preview.kill('SIGTERM');
}
