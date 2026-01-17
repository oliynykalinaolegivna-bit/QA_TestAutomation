export function getExpirationDatePlusMonths(months: number): string {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}/${year}`;
}

export const EXPIRATION_DATE = getExpirationDatePlusMonths(3);

export const DUMMY_CREDIT_CARD = {
    cardNumber: '1111-1111-1111-1111',
    expirationDate: EXPIRATION_DATE,
    cvv: '111',
    cardHolderName: 'Test Card Holder'
};

export const DUMMY_BILLING_ADDRESS = {
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    country: 'Ukraine',
    postcode: '12345'
};