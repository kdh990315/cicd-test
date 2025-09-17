import { expect, test } from "@playwright/test";

test("home page", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const title = page.locator("h1");

  await expect(title).toBeVisible();
  await expect(title).toHaveText("컴포넌트 테스트 연습하기");
});
