import { test, expect } from '@playwright/test';

// SPEC.md:4 - Sections with ids #hero #about #skills #projects #repos #contact must all exist.
test('all six required sections exist', async ({ page }) => {
  await page.goto('/');
  for (const id of ['hero', 'about', 'skills', 'projects', 'repos', 'contact']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

// SPEC.md:5 - No horizontal scroll at a viewport width of 375px.
test('no horizontal scroll at 375px viewport width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

// SPEC.md:6 - #repos lists public GitHub repos as cards, or shows a plain message if there are none or the fetch fails.
test('#repos shows repo cards or a plain fallback message', async ({ page }) => {
  await page.goto('/');
  const repos = page.locator('#repos');
  const cardCount = await repos.locator('[class*="card"], article, li').count();
  const text = (await repos.textContent())?.trim() ?? '';
  expect(cardCount > 0 || text.length > 0).toBeTruthy();
});

// SPEC.md:7 - #hero contains links to email, GitHub and LinkedIn.
test('#hero contains links to email, GitHub and LinkedIn', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#hero');
  await expect(hero.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(hero.locator('a[href*="github.com"]')).toHaveCount(1);
  await expect(hero.locator('a[href*="linkedin.com"]')).toHaveCount(1);
});

// SPEC.md:7 - #contact contains links to email, GitHub and LinkedIn.
test('#contact contains links to email, GitHub and LinkedIn', async ({ page }) => {
  await page.goto('/');
  const contact = page.locator('#contact');
  await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(contact.locator('a[href*="github.com"]')).toHaveCount(1);
  await expect(contact.locator('a[href*="linkedin.com"]')).toHaveCount(1);
});

// SPEC.md:10 - A button in the nav toggles a 'dark' class on <body>.
test('nav button toggles dark class on body', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('nav button');
  await expect(page.locator('body')).not.toHaveClass(/dark/);
  await toggle.click();
  await expect(page.locator('body')).toHaveClass(/dark/);
  await toggle.click();
  await expect(page.locator('body')).not.toHaveClass(/dark/);
});

// SPEC.md:11 - The dark-mode choice is kept for the session.
test('dark-mode choice persists across a reload within the session', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('nav button');
  await toggle.click();
  await expect(page.locator('body')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('body')).toHaveClass(/dark/);
});
