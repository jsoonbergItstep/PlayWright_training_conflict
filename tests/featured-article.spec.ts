import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';

test('Проверка блока "Избранная статья" на заглавной странице', async ({ page }) => {
  // Шаг 1: открываем wikipedia.org и выбираем русский язык
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();

  // Шаг 2: Переход на заглавную страницу (иногда по умолчанию уже там)
  await page.goto('https://ru.wikipedia.org/wiki/Заглавная_страница');

  // Шаг 3: Ищем блок с заголовком "Избранная статья"
  const heading = page.getByRole('heading', { name: 'Избранная статья', level: 2 });
  await expect(heading).toBeVisible();

  // Шаг 4: Проверяем, что под этим заголовком есть содержимое (абзацы)
  const block = heading.locator('xpath=..'); // родитель заголовка
  const paragraphs = block.locator('p');
  const count = await paragraphs.count();

  // Проверим, что хотя бы один абзац есть и он не пустой
  expect(count).toBeGreaterThan(0);
  const firstText = await paragraphs.first().textContent();
  expect(firstText?.trim().length).toBeGreaterThan(20);
});
