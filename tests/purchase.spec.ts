import { test } from '../fixtures/fixtures';
import { PaymentPage } from '../pages/payment.page';

test.describe('Purchase flow', () => {
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
        await billingAddressPage.fillBillingDetails({
            address: '123 Test Street',
            city: 'Test City',
            state: 'Test State',
            country: 'Ukraine',
            postcode: '12345'
        });

        // Step 11: Перейти до оплати
        await billingAddressPage.clickProceedToPayment();

        // Step 12: Заповнити дані кредитної картки
        // Expiration Date: +3 місяці від дати запуску тесту
        const expirationDate = PaymentPage.getExpirationDatePlusMonths(3);

        await paymentPage.fillCreditCardDetails({
            cardNumber: '1111-1111-1111-1111',
            expirationDate: expirationDate,
            cvv: '111',
            cardHolderName: 'Test Card Holder'
        });

        // Step 13: Підтвердити оплату
        await paymentPage.clickConfirm();

        // Step 14: Перевірити, що платіж успішний
        await confirmationPage.expectPaymentSuccessful();
    });
});