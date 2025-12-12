// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Snapchat Pixel Live Tests', () => {
  test('verify pixel loads and fires on LIVE site', async ({ page }) => {
    // Track all network requests to Snapchat
    const snapRequests = [];

    page.on('request', request => {
      const url = request.url();
      if (url.includes('sc-static.net') || url.includes('tr.snapchat.com') || url.includes('snapchat')) {
        snapRequests.push({
          url: url,
          method: request.method()
        });
      }
    });

    // Go to LIVE site
    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');

    // Wait a bit for pixel to initialize
    await page.waitForTimeout(2000);

    // Check if snaptr function exists
    const snaptrExists = await page.evaluate(() => {
      return typeof window.snaptr === 'function';
    });
    console.log('snaptr function exists:', snaptrExists);
    expect(snaptrExists).toBe(true);

    // Check if Snapchat SDK was loaded
    const sdkLoaded = snapRequests.some(r => r.url.includes('scevent.min.js'));
    console.log('Snapchat SDK loaded:', sdkLoaded);
    console.log('All Snap requests:', JSON.stringify(snapRequests, null, 2));
    expect(sdkLoaded).toBe(true);

    // Check pixel ID in page source
    const pageContent = await page.content();
    const hasPixelId = pageContent.includes('78591e18-0e3e-419a-bbd1-c0f230bd3eb4');
    console.log('Pixel ID found in source:', hasPixelId);
    expect(hasPixelId).toBe(true);

    // Check snaptr initialization
    const pixelInfo = await page.evaluate(() => {
      const result = {
        snaptrType: typeof window.snaptr,
        hasQueue: false,
        queueContents: []
      };
      if (window.snaptr) {
        result.hasQueue = Array.isArray(window.snaptr.queue);
        if (result.hasQueue) {
          result.queueContents = window.snaptr.queue.map(item => JSON.stringify(item));
        }
      }
      return result;
    });
    console.log('Pixel info:', JSON.stringify(pixelInfo, null, 2));
  });

  test('check for tracking requests to Snapchat servers', async ({ page }) => {
    const trackingRequests = [];

    page.on('request', request => {
      const url = request.url();
      // Snapchat tracking endpoint
      if (url.includes('tr.snapchat.com') || url.includes('sc-analytics')) {
        trackingRequests.push(url);
      }
    });

    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('Tracking requests sent to Snapchat:', trackingRequests);
    console.log('Number of tracking requests:', trackingRequests.length);
  });

  test('check console for any JavaScript errors', async ({ page }) => {
    const errors = [];

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('JavaScript errors found:', errors);

    // Filter for snap-related errors only
    const snapErrors = errors.filter(e =>
      e.toLowerCase().includes('snap') ||
      e.toLowerCase().includes('sc-static') ||
      e.toLowerCase().includes('snaptr')
    );

    expect(snapErrors.length).toBe(0);
  });
});
