import { test } from '../fixtures/fixtures';

test('Verify user can add product to cart', { tag: '@smoke' }, async ({ app }) => {
    const { homePage, productDetailsPage, cartPage } = app;

    // Step 1: Open homepage
    await homePage.open();

    // Step 2: Click on the product "Slip Joint Pliers"
    await homePage.clickProductByName('Slip Joint Pliers');

    // Assert: Verify URL contains /product
    await productDetailsPage.expectUrl(/\/product\//);

    // Assert: Verify product name is "Slip Joint Pliers"
    await productDetailsPage.expectProductName('Slip Joint Pliers');

    // Assert: Verify product price is 9.17
    await productDetailsPage.expectProductPrice('9.17');

    // Step 3: Click "Add to Cart" button
    await productDetailsPage.addToCartButton.click();

    // Assert: Verify alert message is visible
    await productDetailsPage.expectAlertMessageVisible();

    // Assert: Verify alert message text contains "Product added to shopping cart"
    await productDetailsPage.expectAlertMessageTextContain('Product added to shopping cart.');

    // Assert: Verify alert disappears in 8 seconds
    await productDetailsPage.expectAlertMessageDisappearIn(8000);

    // Assert: Verify cart icon in navigation shows quantity = 1
    await productDetailsPage.expectCartQuantity(1);

    // Step 4: Click on the cart icon in the navigation
    await productDetailsPage.cartQuantity.click();

    // Assert: Verify URL is /checkout
    await cartPage.expectUrl(/\/checkout/);

    // Assert: Verify the number of products in the cart table equals 1
    await cartPage.expectProductQuantity(1);

    // Assert: Verify product title in the cart is "Slip Joint Pliers"
    await cartPage.expectProductTitle('Slip Joint Pliers');

    // Assert: Verify "Proceed to Checkout" button is visible
    await cartPage.expectProceedToCheckoutVisible();
});