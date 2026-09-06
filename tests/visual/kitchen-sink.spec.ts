import { test, expect } from '@playwright/test';

test('kitchen sink matches baseline', async ({ page }) => {
  await page.goto('/kitchen-sink');
  await expect(page).toHaveScreenshot('kitchen-sink.png', { fullPage: true });
});
