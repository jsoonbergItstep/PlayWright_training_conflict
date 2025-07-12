import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';
import fs from 'fs';

async function openRandomRussianArticle(page) {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();
  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();
  return page.locator('#firstHeading');
}

test('Сохраняем скриншот статьи с названием заголовка', async ({ page }) => {
  const heading = await openRandomRussianArticle(page);
  const rawTitle = (await heading.textContent()) ?? 'article';
  const safeTitle = rawTitle.replace(/[\\/:*?"<>|]/g, '_').trim();

  // убеждаемся, что папка существует
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

  await page.screenshot({ path: `screenshots/${safeTitle}.png`, fullPage: true });
  expect(safeTitle).not.toBe('');
});
