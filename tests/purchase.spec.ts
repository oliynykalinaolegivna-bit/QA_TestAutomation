import { test } from '../fixtures/fixtures';
import { DUMMY_CREDIT_CARD, DUMMY_BILLING_ADDRESS } from '../utils/payment.utils';

test.describe('Purchase flow', { tag: '@regression' }, () => {
    test('Verify logged in user can complete purchase', async ({ loggedInApp }) => {
        const {
            homePage,
            productDetailsPage,
            cartPage,
            signInStepPage,
            billingAddressPage,
            paymentPage,
            confirmationPage
        } = loggedInApp;

        // Step 1: Відкрити домашню сторінку
        await homePage.open();

        // Step 2: Зберегти інформацію про перший продукт
        const productInfo = await homePage.getFirstProductInfo();
        const savedProductName = productInfo.name;
        const savedProductPrice = productInfo.price;

        // Step 3: Клікнути на перший продукт
        await homePage.addFirstProductToCart();

        // Step 4: Додати продукт в корзину
        await productDetailsPage.addToCartButton.click();
        await productDetailsPage.expectAlertMessageTextContain('Product added to shopping cart.');

        // Step 5: Відкрити корзину
        await cartPage.openCart();
        await cartPage.expectUrl(/\/checkout/);

        // Step 6: Перевірити назву, ціну та сумарну ціну
        await cartPage.expectProductTitle(savedProductName);
        await cartPage.expectProductPrice(savedProductPrice);
        await cartPage.expectTotalPrice(savedProductPrice);

        // Step 7: Натиснути Proceed to checkout
        await cartPage.clickProceedToCheckout();

        // Step 8: Перевірити, що юзер залогінений і пропустити sign-in крок
        await signInStepPage.waitForStep();
        await signInStepPage.expectUserIsLoggedIn();
        await signInStepPage.clickProceed();

        // Step 9: Чекаємо на форму Billing Address
        await billingAddressPage.expectBillingFormVisible();

        // Step 10: Ввести відсутні поля на сторінці Billing Address
        await billingAddressPage.fillBillingDetails(DUMMY_BILLING_ADDRESS);

        // Step 11: Перейти до оплати
        await billingAddressPage.clickProceedToPayment();

        // Step 12: Заповнити дані кредитної картки
        await paymentPage.fillCreditCardDetails(DUMMY_CREDIT_CARD);

        // Step 13: Підтвердити оплату
        await paymentPage.clickConfirm();

        // Step 14: Перевірити, що платіж успішний
        await confirmationPage.expectPaymentSuccessful();
    });
});