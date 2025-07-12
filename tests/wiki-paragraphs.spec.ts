import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

async function openRandomRussianArticle(page) {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();
  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();
}

test('Статья содержит хотя бы один непустой параграф', async ({ page }) => {
  await openRandomRussianArticle(page);

  // Ждём появления хотя бы одного <p> на странице
  await page.waitForSelector('p', { timeout: 5000 });

  // Получаем тексты всех абзацев
  const allParagraphs = await page.locator('p').allTextContents();

  // Фильтруем только те, у которых есть содержимое
  const meaningfulParagraphs = allParagraphs.filter(
    (text) => text.trim().length > 30
  );

  console.log('Всего абзацев:', allParagraphs.length);
  console.log('Содержательных абзацев:', meaningfulParagraphs.length);

  expect(meaningfulParagraphs.length).toBeGreaterThan(0);
});
