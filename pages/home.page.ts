import { Page } from "@playwright/test";
import { BasePage } from './base.page';

export class HomePage extends BasePage {
   
    constructor (page: Page) {
        super(page, '/');
    }

     async clickProductByName(productName: string) {
        await this.page
            .locator('a.card')
            .filter({ hasText: productName })
            .first()
            .click();
    }
}