import { test, expect } from '@playwright/test';

test('Verify 20 products are displayed', async ({ page }) => {
    await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
        const response = await route.fetch();
        const json = await response.json();

        // Дублюємо товари щоб отримати 20
        const originalProducts = json.data;
        const products20 = [];
        for (let i = 0; i < 20; i++) {
            const product = { ...originalProducts[i % originalProducts.length] };
            product.id = `product-${i}`;
            product.name = `Product ${i + 1}`;
            products20.push(product);
        }
        json.data = products20;

        await route.fulfill({ response, json });
    });

    await page.goto('https://practicesoftwaretesting.com/');

    await expect(page.locator('[data-test="product-name"]')).toHaveCount(20);
});