# Winter Fluffy Shearling Sneaker Landing Page - Implementation Plan

## Overview

Building a premium, mobile-optimized landing page for a winter shearling sneaker inspired by the INUIKII competition (https://inuikii.com/shearling-low-velcro). The page will feature ultra-premium design elements, custom SVGs, accordions, sticky pre-order functionality, and validated size selection.

---

## Competition Analysis Summary (INUIKII Shearling Low Velcro)

**Key Features Identified:**
- Product: "Shearling Low Velcro" - Winter sneaker with wool lining
- Price: €219 (~$240 USD) - we're positioned significantly lower at $59
- Design Language: Premium, handcrafted European aesthetic
- Materials: 90% leather, 10% wool exterior; 100% wool lining
- Certifications: RWS wool, LWG-rated leather, OEKO-TEX
- Layout: Expandable sections/accordions for product details
- Mobile: Touch-optimized with swipe gallery

---

## Pricing Structure (User Specified)

| Tier | Price | Description |
|------|-------|-------------|
| **Order Now** | $59 | Full price, ships immediately |
| **Pre-Order** | $19 | Ships in 2-3 weeks, triggers order bump popup |
| **Order Bump** | $29 | Pre-order + matching accessory |

---

## Phase 1: Research & Asset Preparation

### 1.1 Color Palette Extraction
Extract colors from existing product images (product-01.jpg, product-02.jpg, product-03.jpg) for:
- Primary color (from shoe material - likely warm brown/tan)
- Secondary color (accents)
- Accent color (highlights)
- Background tints

**Target Palette (Winter Fluffy Sneaker):**
- Primary: Warm brown/tan tones matching shearling
- Secondary: Cream/off-white from wool
- Accent: Rich espresso or charcoal for contrast
- Background: Warm ivory/cream gradients

### 1.2 Premium SVG Icons to Create
All SVGs will be custom-designed for this product:

1. **Brand Logo SVG** - Custom "WINTER FLUFFY" logotype
2. **Shearling Badge** - Premium material certification icon
3. **Wool Certification** - OEKO-TEX style badge
4. **Handcrafted Badge** - European craftsmanship icon
5. **Warmth Rating** - Temperature/comfort indicator
6. **Comfort Cloud** - Cushioning visualization
7. **Waterproof Shield** - Weather protection icon
8. **Size Fit Guide** - Foot measurement icon
9. **Sustainability Leaf** - Eco-friendly badge
10. **Express Shipping Truck** - Premium delivery icon

---

## Phase 2: Premium UI Components

### 2.1 Accordion System (Required)
Implement premium accordions for:

```
┌─────────────────────────────────────────────────┐
│ [+] MATERIALS & CRAFTSMANSHIP                   │
├─────────────────────────────────────────────────┤
│     - Premium shearling exterior                │
│     - 100% wool lining                          │
│     - Velcro closure system                     │
│     - Handcrafted in Europe                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ [+] SIZE & FIT GUIDE                            │
├─────────────────────────────────────────────────┤
│     - True to size fit                          │
│     - EU/US/UK conversion chart                 │
│     - Foot width recommendations                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ [+] SHIPPING & RETURNS                          │
├─────────────────────────────────────────────────┤
│     - Free express shipping                     │
│     - 30-day hassle-free returns               │
│     - International delivery available          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ [+] CARE INSTRUCTIONS                           │
├─────────────────────────────────────────────────┤
│     - Shearling care guide                      │
│     - Cleaning recommendations                  │
│     - Storage tips                              │
└─────────────────────────────────────────────────┘
```

### 2.2 Sticky Pre-Order Element
Implementation requirements:
- Fixed position element near pre-order button
- Shows: Selected size, price, "Secure Checkout" indicator
- Animates in when user scrolls past main CTA
- Mobile: Full-width bottom bar
- Desktop: Floating card on right side

### 2.3 Size Selection Validation
- If no size selected when CTA clicked → smooth scroll to size selector
- Visual highlight/shake animation on size selector
- Toast message: "Please select your size"
- Auto-focus on size selector area

---

## Phase 3: Mobile-First Optimization

### 3.1 Performance Targets
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 2.0s
- Cumulative Layout Shift: < 0.1
- Target page load: Sub-1.8s on 4G

### 3.2 Mobile-Specific Features
- Touch-optimized size buttons (min 48px tap targets)
- Swipe-enabled product gallery
- Sticky bottom CTA bar
- Collapsible accordion sections (closed by default)
- Optimized hero image (WebP, responsive sizes)
- Native scroll momentum

### 3.3 Image Optimization Strategy
- Convert JPG → WebP (40% smaller)
- Create responsive sizes: 400px, 600px, 800px, 1200px
- Implement LQIP (Low Quality Image Placeholder)
- Lazy load below-fold images

---

## Phase 4: Premium Visual Elements

### 4.1 Animation System (CSS-only for performance)
Based on PREMIUM-UI-PLAN.md:

1. **Scroll Reveal** - Elements fade up on scroll
2. **Staggered Entry** - Testimonials/features cascade in
3. **Button Shimmer** - CTA has subtle shine animation
4. **Accordion Expand** - Smooth height transitions
5. **Size Selection Pop** - Spring animation on select
6. **Hover Lift** - Cards lift on hover
7. **Scroll Progress Bar** - Top indicator in brand color

### 4.2 Color Application
Dynamic color variables throughout:
```css
--color-primary: #8B6914;        /* Warm shearling gold */
--color-primary-dark: #6B5110;   /* Deeper brown */
--color-primary-light: #C9A54C;  /* Light accent */
--color-secondary: #F5EFE0;      /* Cream wool */
--color-accent: #4A3728;         /* Espresso */
```

### 4.3 Typography
- Headings: Cormorant Garamond (luxury serif)
- Body: Montserrat (clean sans-serif)
- Premium kerning and letter-spacing

---

## Phase 5: Product Content Generation

### 5.1 Product Details
**Product Name:** "Fluffy Shearling Winter Sneaker"
**Tagline:** "Where winter warmth meets urban style"

**Key Features:**
1. Premium shearling wool lining
2. Velcro closure for easy on/off
3. Weather-resistant exterior
4. Memory foam insole
5. Anti-slip rubber sole
6. European craftsmanship

### 5.2 Testimonials (15-23 based on image count)
Generate product-specific testimonials mentioning:
- Warmth and comfort
- Style versatility
- Quality of materials
- Worth the price
- Compliments received

### 5.3 Order Bump Product
**Matching Accessory:** Shearling Boot Insoles or Wool Care Kit
- Complements the shoe purchase
- Adds perceived value at $29
- Clear benefit messaging

---

## Phase 6: Technical Implementation

### 6.1 HTML Structure
```
├── Worn By Favorites Bar (top)
├── Product Hero Section
│   ├── Gallery (left)
│   └── Product Info (right)
│       ├── Title & Tagline
│       ├── Live Viewers
│       ├── Certification Badges
│       ├── Price Box
│       ├── Stock Warning
│       ├── Size Selector
│       ├── CTA Buttons
│       └── Trust Badges
├── Premium Accordions Section
│   ├── Materials & Craftsmanship
│   ├── Size & Fit Guide
│   ├── Shipping & Returns
│   └── Care Instructions
├── Testimonials Grid
├── Featured Review Carousel
├── Footer
├── Sticky Mobile CTA
├── Order Bump Popup
└── Exit Transition Overlay
```

### 6.2 JavaScript Features
- Intersection Observer for scroll reveals
- Size selection with validation
- Accordion toggle functionality
- Sticky CTA visibility control
- Gallery thumbnail switching
- Live viewer count animation
- Stock countdown
- Cookie consent handling
- SimpleSwap checkout integration

### 6.3 Netlify Function
Existing `buy-now.js` function handles:
- POST requests to SimpleSwap pool server
- CORS bypass for payment processing
- Supports: $19, $29, $59 amounts

---

## Phase 7: Playwright Visual Testing

### 7.1 Installation
```bash
npx playwright install
```

### 7.2 Test Scenarios
1. **Mobile viewport tests** (375px, 414px, 390px widths)
2. **Size selection validation** - CTA click without size
3. **Accordion expansion** - All sections open/close
4. **Sticky CTA appearance** - Scroll trigger point
5. **Gallery functionality** - Thumbnail switching
6. **Order bump popup** - Pre-order flow
7. **Responsive breakpoints** - 768px, 1024px, 1440px

### 7.3 Visual Regression
- Screenshot comparison for key states
- Mobile/desktop parity checks
- Animation timing verification

---

## Implementation Order

1. **Color extraction** from product images
2. **Custom SVG creation** for premium badges
3. **HTML structure** with accordions
4. **CSS styling** with mobile-first approach
5. **JavaScript functionality**
6. **Size validation & sticky pre-order**
7. **Testimonial generation**
8. **Image optimization**
9. **Playwright testing setup**
10. **Visual verification & fixes**
11. **Performance audit**
12. **Final deployment**

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Create | Main landing page |
| `template.html` | Reference | Base template (keep intact) |
| `css/styles.css` | Create | Extracted styles for maintainability |
| `js/main.js` | Create | Extracted JavaScript |
| `images/product/*.webp` | Create | Optimized images |
| `images/icons/*.svg` | Create | Custom premium SVGs |
| `playwright.config.js` | Create | Test configuration |
| `tests/landing.spec.js` | Create | Visual tests |

---

## Success Criteria

- [ ] Sub-1.8s mobile load time
- [ ] All accordions functional
- [ ] Size selection validation works
- [ ] Sticky pre-order element appears on scroll
- [ ] Smooth scroll to size selector when needed
- [ ] All CTAs trigger correct checkout amounts
- [ ] Mobile-optimized with touch targets ≥48px
- [ ] Premium visual feel with custom SVGs
- [ ] Consistent color palette throughout
- [ ] Playwright tests pass
- [ ] No console errors
- [ ] WCAG 2.1 AA accessibility compliance

---

## Agent Delegation Strategy

For maximum efficiency, delegate to specialized subagents:

1. **Explore Agent** - Analyze codebase structure
2. **landing-page-builder Skill** - Execute main build
3. **Playwright MCP** - Visual verification & testing

All agents work in parallel where possible to minimize build time.

---

*Plan Version: 1.0*
*Target Completion: Single session*
*Estimated Build Time: 15-25 minutes with parallel agent execution*
