import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
        port: 4173,
        reuseExistingServer: false,
        timeout: 60000
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(spec)\.[jt]s/,
    timeout: 30000,
    retries: 1,
    use: {
        baseURL: 'http://127.0.0.1:4173',
        viewport: { width: 1440, height: 900 },
        actionTimeout: 10000
    }
});
