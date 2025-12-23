import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/product-details.page';

test('Verify user can view product details', async({page}) => {
    const homePage = new HomePage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    
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