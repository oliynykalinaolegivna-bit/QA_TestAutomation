import { Page } from "@playwright/test";

export class HomePage {
    page: Page;
    readonly url = 'https://practicesoftwaretesting.com';

    constructor (page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto(this.url);
    }

    async clickProductByName(productName: string) {
        await this.page.locator(`a.card:has([data-test="product-name"]:text("${productName}"))`).click();
    }
}