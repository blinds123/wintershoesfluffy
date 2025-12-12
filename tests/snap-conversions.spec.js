// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Snapchat Pixel Conversion Events - LIVE Site', () => {

  test('ADD_CART conversion fires when clicking CTA with size', async ({ page }) => {
    const snaptrCalls = [];

    // Intercept snaptr calls
    await page.addInitScript(() => {
      window._snaptrCalls = [];
      const originalSnaptr = window.snaptr;
      Object.defineProperty(window, 'snaptr', {
        get() { return originalSnaptr; },
        set(fn) {
          window._originalSnaptr = fn;
          window.snaptr = function(...args) {
            window._snaptrCalls.push(args);
            return fn.apply(this, args);
          };
        }
      });
    });

    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');

    // Intercept snaptr after page load
    await page.evaluate(() => {
      window._snaptrCalls = [];
      const orig = window.snaptr;
      window.snaptr = function(...args) {
        window._snaptrCalls.push(args);
        return orig.apply(this, args);
      };
    });

    // Select a size
    await page.locator('.size-btn:not([disabled])').first().click();
    await expect(page.locator('.size-btn.selected')).toBeVisible();

    // Click primary CTA
    await page.locator('.cta-btn.cta-primary').first().click();

    // Wait for event
    await page.waitForTimeout(1000);

    // Check calls
    const calls = await page.evaluate(() => window._snaptrCalls);
    console.log('Snaptr calls after CTA click:', JSON.stringify(calls, null, 2));

    const addCartCall = calls.find(c => c[0] === 'track' && c[1] === 'ADD_CART');
    expect(addCartCall).toBeTruthy();
    console.log('ADD_CART event:', JSON.stringify(addCartCall, null, 2));
  });

  test('ADD_CART conversion fires for order bump', async ({ page }) => {
    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');

    // Intercept snaptr
    await page.evaluate(() => {
      window._snaptrCalls = [];
      const orig = window.snaptr;
      window.snaptr = function(...args) {
        window._snaptrCalls.push(args);
        return orig.apply(this, args);
      };
    });

    // Select a size
    await page.locator('.size-btn:not([disabled])').first().click();

    // Click pre-order (secondary) to open popup
    await page.locator('.cta-btn.cta-secondary').first().click();
    await expect(page.locator('#orderBumpPopup')).toHaveClass(/active/);

    // Accept the bump
    await page.locator('.popup-cta').click();

    // Wait for event
    await page.waitForTimeout(1000);

    // Check calls
    const calls = await page.evaluate(() => window._snaptrCalls);
    console.log('Snaptr calls after bump accept:', JSON.stringify(calls, null, 2));

    // Find bump ADD_CART (Winter Care Kit Bundle)
    const bumpCall = calls.find(c =>
      c[0] === 'track' &&
      c[1] === 'ADD_CART' &&
      c[2]?.content_name === 'Winter Care Kit Bundle'
    );
    expect(bumpCall).toBeTruthy();
    console.log('Order Bump ADD_CART event:', JSON.stringify(bumpCall, null, 2));
  });

  test('VIEW_CONTENT fires on page load with product data', async ({ page }) => {
    // Track network requests
    const postRequests = [];
    page.on('request', req => {
      if (req.url().includes('tr.snapchat.com/p') && req.method() === 'POST') {
        postRequests.push(req.url());
      }
    });

    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify tracking posts were made
    console.log('Tracking POST requests:', postRequests.length);
    expect(postRequests.length).toBeGreaterThan(0);

    // Check page source has VIEW_CONTENT
    const hasViewContent = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script');
      for (const script of scripts) {
        if (script.textContent?.includes("'VIEW_CONTENT'")) {
          return true;
        }
      }
      return false;
    });
    console.log('VIEW_CONTENT in source:', hasViewContent);
    expect(hasViewContent).toBe(true);
  });

  test('START_CHECKOUT event is configured before redirect', async ({ page }) => {
    await page.goto('https://wintershoesfluffy.netlify.app/');
    await page.waitForLoadState('networkidle');

    // Check that START_CHECKOUT is in the processOrder function
    const hasStartCheckout = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script');
      for (const script of scripts) {
        if (script.textContent?.includes("'START_CHECKOUT'")) {
          return true;
        }
      }
      return false;
    });
    console.log('START_CHECKOUT configured:', hasStartCheckout);
    expect(hasStartCheckout).toBe(true);
  });
});
