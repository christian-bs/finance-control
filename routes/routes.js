import express from 'express';
import transactionService from '../services/transactionService.js';

const transactionRouter = express();

transactionRouter.get(
    '/period/:period',
    transactionService.getPeriodTransactions
);
transactionRouter.get('/', transactionService.getTransaction);
transactionRouter.post('/', transactionService.insertTransaction);
transactionRouter.patch(
    '/updateTransaction',
    transactionService.updateTransaction
);

export default transactionRouter;
