import { Page, expect } from '@playwright/test';

export class BasePage {
    page: Page;
    path: string;

    constructor(page: Page, path: string = '') {
        this.page = page;
        this.path = path;
    }

    async open() {
        await this.page.goto(this.path);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async expectUrl(expectedUrl: string | RegExp) {
        await expect(this.page).toHaveURL(expectedUrl);
    }
}