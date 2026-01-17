import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    readonly totalPrice: Locator;
    readonly proceedToCheckoutButton: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        super(page, '/checkout');
        this.productTitle = page.getByTestId('product-title');
        this.productPrice = page.getByTestId('product-price');
        this.productQuantity = page.getByTestId('product-quantity');
        this.totalPrice = page.getByTestId('cart-total');
        this.proceedToCheckoutButton = page.getByTestId('proceed-1');
        this.cartIcon = page.getByTestId('cart-quantity');
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async expectProductTitle(expectedTitle: string) {
        await expect(this.productTitle).toHaveText(expectedTitle);
    }

    async expectProductPrice(expectedPrice: string) {
        await expect(this.productPrice).toContainText(expectedPrice);
    }

    async expectTotalPrice(expectedTotal: string) {
        await expect(this.totalPrice).toContainText(expectedTotal);
    }

    async expectProductQuantity(quantity: number) {
        await expect(this.productQuantity).toHaveValue(quantity.toString());
    }

    async expectProceedToCheckoutVisible() {
        await expect(this.proceedToCheckoutButton).toBeVisible();
    }
}