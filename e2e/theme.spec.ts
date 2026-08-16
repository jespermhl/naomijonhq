import { test, expect } from "@playwright/test";

test.use({ channel: "chrome" });

const THEME_ROUTES: Array<[string, string]> = [
  ["/", "villain"],
  ["/strawberry", "strawberry"],
  ["/strawberry-album", "strawberry"],
  ["/villainofyourdreams", "villain"],
  ["/shop", "strawberry"],
];

test.describe("cms theme wiring", () => {
  for (const [path, expectedTheme] of THEME_ROUTES) {
    test(`${path} gets data-theme="${expectedTheme}"`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(err.message));

      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme",
        expectedTheme,
      );
      expect(errors).toEqual([]);
    });
  }
});
