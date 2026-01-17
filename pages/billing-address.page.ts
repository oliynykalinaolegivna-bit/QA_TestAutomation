import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export class BillingAddressPage extends BasePage {
    readonly addressField: Locator;
    readonly cityField: Locator;
    readonly stateField: Locator;
    readonly countryField: Locator;
    readonly postcodeField: Locator;
    readonly proceedToPaymentButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addressField = page.getByTestId('street');
        this.cityField = page.getByTestId('city');
        this.stateField = page.getByTestId('state');
        this.countryField = page.getByTestId('country');
        this.postcodeField = page.getByTestId('postal_code');
        this.proceedToPaymentButton = page.getByTestId('proceed-3');
    }

    async fillBillingDetails(details: {
        address: string;
        city: string;
        state: string;
        country: string;
        postcode: string;
    }) {
        await this.addressField.fill(details.address);
        await this.cityField.fill(details.city);
        await this.stateField.fill(details.state);
        await this.countryField.fill(details.country);
        await this.postcodeField.fill(details.postcode);
    }

    async clickProceedToPayment() {
        await this.proceedToPaymentButton.click();
    }

    async expectBillingFormVisible() {
        await expect(this.addressField).toBeVisible();
    }
}