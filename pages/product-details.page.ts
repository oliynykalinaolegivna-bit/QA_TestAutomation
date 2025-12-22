import { Locator, Page, expect } from "@playwright/test";

export class ProductDetailsPage {
    page: Page;
    productName: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;
    readonly expectedUrl = 'https://practicesoftwaretesting.com/account';

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="unit-price"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.addToFavoritesButton = page.locator('[data-test="add-to-favorites"]');
    }

    async expectUrl() {
        await expect(this.page).toHaveURL(/\/product\//);
    }

    async expectProductName(expectedName: string) {
        await expect(this.productName).toHaveText(expectedName);
    }

    async expectProductPrice(expectedPrice: string) {
        await expect(this.productPrice).toContainText(expectedPrice);
    }

    async expectAddToCartButtonVisible() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async expectAddToFavoritesButtonVisible() {
        await expect(this.addToFavoritesButton).toBeVisible();
    }
}