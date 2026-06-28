import { test, expect } from "@playwright/test";

test("homepage loads and displays title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Naomi Jon/);
});

test("navigation links are accessible", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("nav");
  await expect(nav.first()).toBeVisible();
});

test("skip to content link is present and functional", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByText("Skip to main content");
  await expect(skipLink).toBeVisible();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
});
