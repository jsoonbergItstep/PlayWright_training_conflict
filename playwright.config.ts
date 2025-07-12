import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true, // запускать тесты с видимым браузером
    screenshot: 'only-on-failure', // делать скриншоты при ошибках
    video: 'retain-on-failure', // сохранять видео только при ошибках
    baseURL: 'https://example.com', // можно указать базовый URL
  },
});