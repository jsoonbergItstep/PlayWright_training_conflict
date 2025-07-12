import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';

test('Поиск статьи "Тестирование" и проверка, что открыта корректная статья', async ({ page }) => {
  // Открываем и выбираем язык
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();

  // Поиск
  const searchInput = page.locator('input[name="search"]');
  await searchInput.fill('Тестирование');
  await searchInput.press('Enter');

  // Кликаем на первую ссылку
  const firstLink = page.getByRole('link', { name: /^Тестирование$/ });
  await firstLink.first().click();

  // Проверяем заголовок
  const title = await page.locator('#firstHeading').textContent();
  console.log('Открыта статья:', title);

  // Принимаем возможное перенаправление
  expect(title?.trim()).toMatch(/^Тест(ирование)?$/);
});
