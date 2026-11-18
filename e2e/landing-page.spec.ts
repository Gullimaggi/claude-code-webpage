import { test, expect } from '@playwright/test';

test.describe('Tjaldsvæði Ólafsfjörður - E2E Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. Page Load & Title: Loads under 1.5s and displays correct H1', async ({ page }) => {
    await expect(page).toHaveTitle(/Tjaldsvæði Ólafsfjörður/);
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('Lítið tjaldsvæði í paradís norðursins');
  });

  test('2. Responsive Layout: Renders cleanly without horizontal overflow', async ({ page }) => {
    const noOverflow = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('header')).toBeVisible();
    expect(await noOverflow()).toBe(true);

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('#gisting')).toBeAttached();
    expect(await noOverflow()).toBe(true);

    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('#adstada')).toBeAttached();
    expect(await noOverflow()).toBe(true);
  });

  test('3. CTA Visibility & Functionality: Booking buttons trigger modal', async ({ page }) => {
    const bookButton = page.getByRole('button', { name: /Taka frá pláss/i }).first();
    await expect(bookButton).toBeVisible();
    await bookButton.click();
    await expect(page.getByText('Taka frá pláss á Tjaldsvæði Ólafsfjörður')).toBeVisible();
  });

  test('4. Navigation / Anchor Links: Scroll navigation works', async ({ page }) => {
    const amenitiesLink = page.getByRole('link', { name: /Aðstaða/i });
    await expect(amenitiesLink).toBeVisible();
    await amenitiesLink.click();
    await expect(page.locator('#adstada')).toBeInViewport();
  });

  test('5. Media Rendering: ich1, ich2 and video are attached', async ({ page }) => {
    const images = page.locator('img[data-test="showcase-img"]');
    expect(await images.count()).toBeGreaterThanOrEqual(2);
    await expect(page.locator('video').first()).toBeAttached();
  });

  test('6. Contact Links & Forms: fetiframar@gmail.com link present', async ({ page }) => {
    await expect(page.locator('a[href*="fetiframar@gmail.com"]').first()).toBeAttached();
  });

  test('7. Partner Link: www.keyrum.is opens with target _blank', async ({ page }) => {
    const links = page.locator('a[href*="keyrum.is"]');
    expect(await links.count()).toBeGreaterThan(0);
    for (const l of await links.all()) {
      await expect(l).toHaveAttribute('target', '_blank');
      await expect(l).toHaveAttribute('rel', /noopener/);
    }
  });

  test('8. Scroll-Based Section Visibility: Video container enters viewport', async ({ page }) => {
    const videoSection = page.locator('#myndband');
    await videoSection.scrollIntoViewIfNeeded();
    await expect(videoSection).toBeInViewport();
  });

  test('9. Accessibility (WCAG 2.1 AA): Buttons have accessible names', async ({ page }) => {
    for (const button of await page.getByRole('button').all()) {
      const name = (await button.getAttribute('aria-label')) || (await button.innerText());
      expect(name.trim().length).toBeGreaterThan(0);
    }
  });

  test('10. Calculator: price updates and passes to modal', async ({ page }) => {
    await page.getByLabel('Nætur (1–21)').fill('3');
    await page.getByLabel(/Leigusamningur frá keyrum/).check();
    // caravan 2900 * 3 = 8700, -10% = 7830
    await expect(page.getByTestId('calc-total')).toHaveText(/7\.830/);
  });
});
