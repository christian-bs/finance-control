import React, { useEffect, useState } from 'react';
import { formatDateToYearMonth } from './helper.js';
import api from './api/api.js';
import M from 'materialize-css';

import Header from './components/Header';
import PeriodSelector from './components/PeriodSelector';
import Preloader from './components/Preloader';
import TransactionCardsContainer from './components/TransactionCardsContainer';
import Button from './components/Button/index.js';
import Summary from './components/Summary/index.js';
import ModalTransaction from './components/ModalTransaction/index.js';

let periodTransactions = {};

export default function App() {
    const [activePeriod, setActivePeriod] = useState(
        formatDateToYearMonth(new Date())
    );

    const [filteredTransactions, setFilteredTransactions] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    // useEffect(() => {
    //     getTransactions();
    // }, []);

    const handlerOnChangeSelect = (newPeriod) => {
        setActivePeriod(newPeriod);
    };

    const handleKeyUpTextInput = ({ target }) => {
        setFilteredTransactions(
            periodTransactions.filter(({ description }) =>
                description.includes(target.value)
            )
        );
    };

    const handleEditTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDeleteTransaction = async (id) => {
        const response = await api.deleteTransaction(id);

        setFilteredTransactions(
            filteredTransactions.filter((t) => t._id !== id)
        );

        periodTransactions = periodTransactions.filter((t) => t._id !== id);

        const message = response === 'OK' ? 'Removido com sucesso' : response;
        M.toast({ html: message, classes: 'rounded' });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAddButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleModalSave = async (transaction) => {
        let response;
        if (!transaction._id) {
            response = await api.insertTransaction(transaction);
            const message =
                response === 'OK' ? 'Inserido com sucesso' : response;
            M.toast({ html: message, classes: 'rounded' });
            return;
        }

        response = await api.updateTransaction(transaction);
        const message = response === 'OK' ? 'Atualizado com sucesso' : response;
        M.toast({ html: message, classes: 'rounded' });
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getTransactions = async () => {
            const transactions = await api.getPeriodTransactions(activePeriod);
            periodTransactions = transactions.data.sort(
                (a, b) => a.day - b.day
            );
            setFilteredTransactions(transactions.data);
        };

        getTransactions();
    }, [activePeriod]);

    return (
        <>
            <Header>
                <PeriodSelector
                    selectedMonth={activePeriod}
                    handleOnChange={handlerOnChangeSelect}
                />
            </Header>
            {filteredTransactions.length === 0 && <Preloader />}
            {filteredTransactions.length > 0 && (
                <>
                    <div className="container col s12">
                        <Summary transactions={filteredTransactions} />
                        <Button onClick={handleAddButtonClick} icon="add">
                            Adicionar
                        </Button>
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Filtrar"
                                onKeyUp={handleKeyUpTextInput}
                            ></input>
                        </div>
                        <TransactionCardsContainer
                            className="col s12"
                            transactionList={filteredTransactions}
                            onDelete={handleDeleteTransaction}
                            onEdit={handleEditTransaction}
                        />
                    </div>
                </>
            )}
            {isModalOpen && (
                <ModalTransaction
                    transaction={selectedTransaction}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            )}
        </>
    );
}
