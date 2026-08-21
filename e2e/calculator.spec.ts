import { expect, test } from '@playwright/test';

test.describe('Number Toolkit', () => {
  test('shows page title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('page-title')).toHaveText('Number Toolkit');
  });

  test('adds two numbers', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('add-a').fill('8');
    await page.getByTestId('add-b').fill('12');
    await page.getByTestId('add-submit').click();

    await expect(page.getByTestId('add-result')).toContainText('20');
  });

  test('clamps value into range', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('clamp-value').fill('20');
    await page.getByTestId('clamp-min').fill('70');
    await page.getByTestId('clamp-max').fill('120');
    await page.getByTestId('clamp-submit').click();

    await expect(page.getByTestId('clamp-result')).toContainText('70');
  });

  test('parses positive integers', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('parse-input').fill('abc');
    await page.getByTestId('parse-submit').click();
    await expect(page.getByTestId('parse-result')).toContainText('无效输入');

    await page.getByTestId('parse-input').fill('534.24');
    await page.getByTestId('parse-submit').click();
    await expect(page.getByTestId('parse-result')).toContainText('534');
  });
});
