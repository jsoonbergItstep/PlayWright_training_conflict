// tests/wiki-internal-links.spec.ts
import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

async function openRandomRussianArticle(page) {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();          // язык = «Русский»
  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();       // переход на случайную статью
}

test('В статье есть хотя бы одна внутренняя ссылка', async ({ page }) => {
  await openRandomRussianArticle(page);

  // 1️⃣ ждём появления первой внутренней ссылки
  await page.waitForSelector('a[href^="/wiki/"]', { timeout: 5000 });

  // 2️⃣ получаем все такие ссылки
  const internalLinks = page.locator('a[href^="/wiki/"]');
  const linkCount     = await internalLinks.count();

  console.log('Найдено внутренних ссылок:', linkCount);

  // 3️⃣ проверяем, что найдено хотя бы одна
  expect(linkCount).toBeGreaterThan(0);
});
