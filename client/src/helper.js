export const formatDateToYearMonth = (date) => {
    const yearMonth =
        date.getUTCFullYear() +
        '-' +
        ('0' + (date.getUTCMonth() + 1)).slice(-2);
    return yearMonth;
};

export const formatDateToYearMonthDay = (date) => {
    const yearMonth =
        date.getUTCFullYear() +
        '-' +
        formatLeadingZeros(date.getUTCMonth() + 1, 2) +
        '-' +
        formatLeadingZeros(date.getUTCDate(), 2);
    return yearMonth;
};

export const currencyFormat = (value) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);

export const formatLeadingZeros = (number, qty) => {
    return number.toString().padStart(qty, '0');
};
