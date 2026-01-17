import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class SignInStepPage extends BasePage {
    readonly proceedButton: Locator;
    readonly loggedInMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedButton = page.getByTestId('proceed-2');
        this.loggedInMessage = page.locator('text=Hello');
    }

    async clickProceed() {
        await this.proceedButton.click();
    }

    async expectUserIsLoggedIn() {
        await expect(this.loggedInMessage.first()).toBeVisible({ timeout: 10000 });
    }

    async waitForStep() {
        await this.proceedButton.waitFor({ state: 'visible', timeout: 10000 });
    }
}