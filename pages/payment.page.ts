import { Locator, Page } from "@playwright/test";
import { BasePage } from './base.page';

export class PaymentPage extends BasePage {
    readonly paymentMethodSelect: Locator;
    readonly cardNumberField: Locator;
    readonly expirationDateField: Locator;
    readonly cvvField: Locator;
    readonly cardHolderNameField: Locator;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.paymentMethodSelect = page.getByTestId('payment-method');
        this.cardNumberField = page.getByTestId('credit_card_number');
        this.expirationDateField = page.getByTestId('expiration_date');
        this.cvvField = page.getByTestId('cvv');
        this.cardHolderNameField = page.getByTestId('card_holder_name');
        this.confirmButton = page.getByTestId('finish');
    }

    async fillCreditCardDetails(details: {
        cardNumber: string;
        expirationDate: string;
        cvv: string;
        cardHolderName: string;
    }) {
        await this.paymentMethodSelect.selectOption({ label: 'Credit Card' });
        await this.cardNumberField.fill(details.cardNumber);
        await this.expirationDateField.fill(details.expirationDate);
        await this.cvvField.fill(details.cvv);
        await this.cardHolderNameField.fill(details.cardHolderName);
    }

    async clickConfirm() {
        await this.confirmButton.click();
    }

    static getExpirationDatePlusMonths(months: number): string {
        const date = new Date();
        date.setMonth(date.getMonth() + months);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${month}/${year}`;
    }
}