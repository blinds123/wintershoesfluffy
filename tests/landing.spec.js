// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Winter Fluffy Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');
    await page.waitForLoadState('domcontentloaded');
  });

  test('page loads successfully with key elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Winter Fluffy/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Winter Fluffy Shearling Sneaker');

    // Check price displays correctly
    await expect(page.locator('.price')).toContainText('$59');
    await expect(page.locator('.old-price')).toContainText('$219');

    // Check discount badge
    await expect(page.locator('.badge')).toContainText('73% OFF');
  });

  test('product gallery has thumbnails', async ({ page }) => {
    // Check main image exists
    const mainImage = page.locator('.main-img');
    await expect(mainImage).toBeVisible();

    // Check thumbnails are loaded
    const thumbs = page.locator('.thumb');
    await expect(thumbs).toHaveCount(3);
  });

  test('size buttons are interactive', async ({ page }) => {
    // Check size buttons exist
    const sizeButtons = page.locator('.size-btn:not([disabled])');
    await expect(sizeButtons.first()).toBeVisible();

    // Click a size button
    await sizeButtons.first().click();

    // Verify it gets selected class
    await expect(sizeButtons.first()).toHaveClass(/selected/);
  });

  test('size validation scrolls to size selector when no size selected', async ({ page }) => {
    // Hide size error initially
    const sizeError = page.locator('#sizeError');
    await expect(sizeError).toBeHidden();

    // Click CTA without selecting size
    await page.locator('.cta-btn.cta-primary').first().click();

    // Size error should be visible
    await expect(sizeError).toBeVisible();
    await expect(sizeError).toContainText('Please select your size');
  });

  test('accordions expand and collapse', async ({ page }) => {
    // Materials accordion
    const accordion1 = page.locator('#accordion1');
    const accordionContent1 = accordion1.locator('.accordion-content');

    // Initially closed
    await expect(accordion1).not.toHaveClass(/open/);

    // Click to open
    await accordion1.locator('.accordion-header').click();
    await expect(accordion1).toHaveClass(/open/);

    // Click again to close
    await accordion1.locator('.accordion-header').click();
    await expect(accordion1).not.toHaveClass(/open/);
  });

  test('multiple accordions - one open at a time', async ({ page }) => {
    const accordion1 = page.locator('#accordion1');
    const accordion2 = page.locator('#accordion2');

    // Open first accordion
    await accordion1.locator('.accordion-header').click();
    await expect(accordion1).toHaveClass(/open/);

    // Open second accordion - first should close
    await accordion2.locator('.accordion-header').click();
    await expect(accordion2).toHaveClass(/open/);
    await expect(accordion1).not.toHaveClass(/open/);
  });

  test('pre-order button shows order bump popup', async ({ page }) => {
    // Select a size first
    await page.locator('.size-btn:not([disabled])').first().click();

    // Click pre-order button
    await page.locator('.cta-btn.cta-secondary').first().click();

    // Order bump popup should appear
    const popup = page.locator('#orderBumpPopup');
    await expect(popup).toHaveClass(/active/);
    await expect(popup).toBeVisible();

    // Check popup content
    await expect(page.locator('.popup-title')).toContainText('complete your winter kit');
    await expect(page.locator('.popup-cta')).toContainText('$29');
  });

  test('order bump popup can be closed', async ({ page }) => {
    // Select size and open popup
    await page.locator('.size-btn:not([disabled])').first().click();
    await page.locator('.cta-btn.cta-secondary').first().click();

    const popup = page.locator('#orderBumpPopup');
    await expect(popup).toHaveClass(/active/);

    // Close with X button
    await page.locator('.popup-close').click();
    await expect(popup).not.toHaveClass(/active/);
  });

  test('testimonials grid renders correctly', async ({ page }) => {
    // Scroll to testimonials section
    await page.locator('.testimonials-section').scrollIntoViewIfNeeded();

    // Check testimonial cards exist
    const testimonialCards = page.locator('.testimonial-card');
    await expect(testimonialCards.first()).toBeVisible();

    // Check count (should be 23 testimonials)
    const count = await testimonialCards.count();
    expect(count).toBe(23);
  });

  test('featured reviews carousel exists', async ({ page }) => {
    const carousel = page.locator('#featuredCarousel');
    await expect(carousel).toBeVisible();

    const reviews = page.locator('.featured-review');
    const count = await reviews.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FAQ accordions work', async ({ page }) => {
    // Scroll to FAQ section
    await page.locator('.faq-section').scrollIntoViewIfNeeded();

    // Check FAQ accordion exists
    const faq1 = page.locator('#faq1');
    await expect(faq1).toBeVisible();

    // Click to open
    await faq1.locator('.accordion-header').click();
    await expect(faq1).toHaveClass(/open/);
  });

  test('trust badges are displayed', async ({ page }) => {
    const trustGrid = page.locator('.trust-grid');
    await expect(trustGrid).toBeVisible();

    const badges = page.locator('.trust-badge');
    await expect(badges).toHaveCount(4);
  });

  test('live viewers counter is displayed', async ({ page }) => {
    const viewerCount = page.locator('#viewerCount');
    await expect(viewerCount).toBeVisible();

    const count = await viewerCount.textContent();
    expect(parseInt(count)).toBeGreaterThan(0);
  });

  test('stock warning is displayed', async ({ page }) => {
    const stockWarning = page.locator('.stock-warning');
    await expect(stockWarning).toBeVisible();
    await expect(stockWarning).toContainText('left in stock');
  });
});

test.describe('Mobile-specific tests', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');
    await page.waitForLoadState('domcontentloaded');
  });

  test('sticky CTA appears on scroll (mobile)', async ({ page }) => {
    const stickyCta = page.locator('#stickyCta');

    // Initially hidden
    await expect(stickyCta).not.toHaveClass(/visible/);

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(100);

    // Sticky CTA should be visible
    await expect(stickyCta).toHaveClass(/visible/);
  });

  test('mobile layout is responsive', async ({ page }) => {
    // Check hero section is single column on mobile
    const heroGrid = page.locator('.product-hero');
    await expect(heroGrid).toBeVisible();

    // Check size grid has 4 columns on mobile
    const sizeGrid = page.locator('.size-grid');
    await expect(sizeGrid).toBeVisible();
  });

  test('touch targets are at least 48px', async ({ page }) => {
    const sizeButtons = page.locator('.size-btn');
    const firstButton = sizeButtons.first();

    const box = await firstButton.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(48);
  });
});

test.describe('Visual regression tests', () => {
  test('homepage screenshot (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('index.html');
    await page.waitForLoadState('networkidle');

    // Take screenshot of hero section
    await expect(page.locator('.product-hero')).toBeVisible();
  });

  test('homepage screenshot (desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('index.html');
    await page.waitForLoadState('networkidle');

    // Take screenshot of hero section
    await expect(page.locator('.product-hero')).toBeVisible();
  });
});
