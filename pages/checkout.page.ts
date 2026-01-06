import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
    productQuantity: Locator;
    productTitle: Locator;
    proceedToCheckoutButton: Locator;


    constructor(page: Page) {
        super(page);
        this.productQuantity = page.getByTestId('product-quantity');
        this.productTitle = page.getByTestId('product-title');
        this.proceedToCheckoutButton = page.getByTestId('proceed-1');
    }

    async expectProductQuantity(items: number) {
        await expect(this.productQuantity).toHaveValue(items.toString())
    }

    async expectProductTitle(title: string) {
        await expect(this.productTitle).toHaveText(title);
    }

    async expectProceedToCheckoutVisible() {
        await expect(this.proceedToCheckoutButton).toBeVisible();
    }
}