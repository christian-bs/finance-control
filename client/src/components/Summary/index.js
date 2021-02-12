import React from 'react';
import { currencyFormat } from '../../helper.js';

const Summary = ({ transactions }) => {
    const transactionsCount = transactions.length;

    const summary = transactions.reduce(
        (summary, current) => {
            current.type === '+'
                ? (summary.income += current.value)
                : (summary.expense += current.value);
            return summary;
        },
        { income: 0, expense: 0 }
    );

    const { income, expense } = summary;

    const balance = income - expense;

    return (
        <div className="card-panel row">
            <div className="col s3">
                Lançamentos: <span>{transactionsCount}</span>
            </div>
            <div className="col s3">
                Receitas:{' '}
                <span className="green-text">{currencyFormat(income)}</span>
            </div>
            <div className="col s3">
                Despesas:{' '}
                <span className="red-text">{currencyFormat(expense)}</span>
            </div>
            <div className="col s3">
                Saldo:
                <span className={balance < 0 ? 'red-text' : 'green-text'}>
                    {currencyFormat(balance)}
                </span>
            </div>
        </div>
    );
};

export default Summary;
