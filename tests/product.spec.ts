import { test } from '../fixtures/fixtures';

test('Verify user can view product details', async ({ app }) => {
    const { homePage, productDetailsPage } = app;

    // Step 1: Open homepage
    await homePage.open();

    // Step 2: Click on product
    await homePage.clickProductByName('Combination Pliers');

    // Assertions на новій сторінці деталей
    await productDetailsPage.expectUrl(/\/product\//);
    await productDetailsPage.expectProductName('Combination Pliers');
    await productDetailsPage.expectProductPrice('14.15');
    await productDetailsPage.expectAddToCartButtonVisible();
    await productDetailsPage.expectAddToFavoritesButtonVisible();
});