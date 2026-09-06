import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/kitchen-sink',
    reuseExistingServer: !process.env.CI,
    env: { KITCHEN_SINK_ENABLED: 'true' },
  },
  use: { baseURL: 'http://localhost:3000' },
});
