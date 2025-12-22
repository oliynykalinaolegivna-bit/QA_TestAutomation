import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    readonly url = 'https://practicesoftwaretesting.com/auth/login';

    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator('[data-test="email"]');
        this.passwordField = this.page.locator('[data-test="password"]');
    }

    async open() {
        await this.page.goto(this.url);
    }
    
    async performLogin(email: string, password: string): Promise <void> {
            await this.emailField.fill(email);
            await this.passwordField.fill(password);
            await this.page.locator('[data-test="login-submit"]').click();
    }
}