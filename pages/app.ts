import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { LoginPage } from './login.page';
import { AccountPage } from './account.page';
import { ProductDetailsPage } from './product-details.page';
import { CartPage } from './cart.page';
import { SignInStepPage } from './sign-in-step.page';
import { BillingAddressPage } from './billing-address.page';
import { PaymentPage } from './payment.page';
import { ConfirmationPage } from './confirmation.page';

export class App {
    readonly page: Page;
    readonly homePage: HomePage;
    readonly loginPage: LoginPage;
    readonly accountPage: AccountPage;
    readonly productDetailsPage: ProductDetailsPage;
    readonly cartPage: CartPage;
    readonly signInStepPage: SignInStepPage;
    readonly billingAddressPage: BillingAddressPage;
    readonly paymentPage: PaymentPage;
    readonly confirmationPage: ConfirmationPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
        this.cartPage = new CartPage(page);
        this.signInStepPage = new SignInStepPage(page);
        this.billingAddressPage = new BillingAddressPage(page);
        this.paymentPage = new PaymentPage(page);
        this.confirmationPage = new ConfirmationPage(page);
    }
}