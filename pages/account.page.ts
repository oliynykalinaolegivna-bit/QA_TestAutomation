import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class AccountPage extends BasePage {
    pageTitle: Locator;
    readonly expectedPageTitle = 'My account';

    constructor (page: Page) {
        super(page, '/account');
        this.pageTitle = page.getByTestId('page-title');
    }

   async expectPageTitle() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText(this.expectedPageTitle, {ignoreCase: true});
   }
}
