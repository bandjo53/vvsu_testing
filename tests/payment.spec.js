// tests/payment.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');

const APP_URL = 'file://' + path.resolve(__dirname, '../kedr_lite.html');

// ✅ ЗЕЛЁНЫЙ ТЕСТ — штатный сценарий из практики 9
test('штатный платёж 500 ₽ проходит', async ({ page }) => {
  await page.goto(APP_URL);
  await page.fill('#amount', '500');
  await page.click('#pay');
  await expect(page.locator('#status')).toContainText('Оплата прошла');
});

// ❌ КРАСНЫЙ ТЕСТ — ловит баг (пример: некорректная сумма "abc")
test('некорректная сумма "abc" не должна проводить платёж', async ({ page }) => {
  await page.goto(APP_URL);
  await page.fill('#amount', 'abc');
  await page.click('#pay');
  // Ожидаем валидацию. Приложение вернёт баг → тест упадёт (это и нужно)
  await expect(page.locator('#status')).toContainText(/ошибк|некоррект/i);
});