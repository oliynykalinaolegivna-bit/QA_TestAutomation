import { Locator, Page, expect } from "@playwright/test";

export class AccountPage {
    page: Page;
    pageTitle: Locator;
    readonly expectedUrl = 'https://practicesoftwaretesting.com/account';

    constructor (page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="page-title"]');
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async expectUrl() {
        await expect(this.page).toHaveURL(this.expectedUrl);
    }

    async expectPageTitle(expectedText: string = 'My account') {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText(expectedText, {ignoreCase: true});
    }
}
