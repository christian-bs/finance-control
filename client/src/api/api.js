import axios from 'axios';

const urlBase = 'http://localhost:3001/api/transaction';

const getPeriodTransactions = async (yearMonth) => {
    const url = `${urlBase}/period/${yearMonth}`;
    const transactions = await axios.get(url);
    return transactions;
};
const getFilteredTransactions = async (filter) => {
    const url = `${urlBase}/?description=${filter}`;
    const transactions = await axios.get(url);
    return transactions;
};

const deleteTransaction = async (id) => {
    const url = `${urlBase}/delete/${id}`;
    const result = await axios.delete(url);
    return result.statusText;
};

const insertTransaction = async (transaction) => {
    const url = `${urlBase}/`;
    const result = await axios.post(url, transaction);
    return result.statusText;
};

const updateTransaction = async (transaction) => {
    const url = `${urlBase}/updateTransaction/`;
    const result = await axios.patch(url, transaction);
    return result.statusText;
};

export default {
    getPeriodTransactions,
    getFilteredTransactions,
    deleteTransaction,
    insertTransaction,
    updateTransaction,
};
