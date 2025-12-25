import { Locator, Page } from "@playwright/test";
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    emailField: Locator;
    passwordField: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        super(page, '/auth/login');
        this.emailField = page.getByTestId('email');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }
 
    async performLogin(email: string, password: string): Promise <void> {
            await this.emailField.fill(email);
            await this.passwordField.fill(password);
            await this.loginButton.click();
    }
}