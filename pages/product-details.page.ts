import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
    productName: Locator;
    productPrice: Locator;
    addToCartButton: Locator;
    addToFavoritesButton: Locator;


    constructor(page: Page) {
        super(page);
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('unit-price');
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.addToFavoritesButton = page.getByTestId('add-to-favorites');
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