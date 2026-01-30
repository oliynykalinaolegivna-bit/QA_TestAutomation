import { test, expect } from '../fixtures/fixtures';
import { API_BASE_URL } from '../config/test-data';
import { generateMockProducts } from '../utils/mock-data.utils';

test('Verify 20 products are displayed', async ({ app }) => {
    await app.page.route(`${API_BASE_URL}/products*`, async route => {
        const response = await route.fetch();
        const json = await response.json();

        json.data = generateMockProducts(json.data, 20);

        await route.fulfill({ response, json });
    });

    await app.homePage.open();

    await expect(app.homePage.productNames).toHaveCount(20);
});