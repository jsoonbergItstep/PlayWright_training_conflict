import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

// вспомогательная функция
async function openRandomRussianArticle(page) {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();              // «Русский»
  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();
  return page.locator('#firstHeading');
}

test('Заголовок случайной статьи видим', async ({ page }) => {
  const heading = await openRandomRussianArticle(page);
  await expect(heading).toBeVisible();
});
