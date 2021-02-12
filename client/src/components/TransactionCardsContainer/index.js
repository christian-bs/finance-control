import React from 'react';
import TransactionCard from '../TransactionCard';

const TransactionCardsContainer = ({ transactionList, onEdit, onDelete }) => {
    return (
        <div>
            {transactionList.length > 0 &&
                transactionList.map((transaction) => {
                    return (
                        <TransactionCard
                            key={transaction._id}
                            transaction={transaction}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    );
                })}
        </div>
    );
};

export default TransactionCardsContainer;
