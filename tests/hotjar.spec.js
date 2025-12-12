// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Hotjar Tracking Tests', () => {
  test('Hotjar script loads correctly', async ({ page }) => {
    await page.goto('index.html');
    await page.waitForLoadState('networkidle');

    // Check if hj function exists
    const hjExists = await page.evaluate(() => typeof window.hj === 'function');
    expect(hjExists).toBe(true);

    // Check if Hotjar settings are configured
    const hjSettings = await page.evaluate(() => window._hjSettings);
    expect(hjSettings).toBeTruthy();
    expect(hjSettings.hjid).toBe(6599975);
    expect(hjSettings.hjsv).toBe(6);
  });

  test('Hotjar script tag is present in page source', async ({ page }) => {
    await page.goto('index.html');
    const pageContent = await page.content();

    expect(pageContent).toContain('hjid:6599975');
    expect(pageContent).toContain('static.hotjar.com');
  });

  test('Hotjar loads from CDN', async ({ page }) => {
    const hotjarRequests = [];

    page.on('request', request => {
      if (request.url().includes('hotjar.com')) {
        hotjarRequests.push(request.url());
      }
    });

    await page.goto('index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify Hotjar script was requested
    const hasHotjarScript = hotjarRequests.some(url => url.includes('hotjar-6599975.js'));
    expect(hasHotjarScript).toBe(true);

    console.log('Hotjar requests:', hotjarRequests);
  });
});
