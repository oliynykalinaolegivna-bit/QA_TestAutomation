import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class ConfirmationPage extends BasePage {
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.successMessage = page.getByText('Payment was successful');
    }

    async expectPaymentSuccessful() {
        await expect(this.successMessage).toBeVisible();
    }
}