import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { formatLeadingZeros } from '../../helper.js';

Modal.setAppElement('#root');

export default ({ onClose, transaction, onSave }) => {
    const isNewTransaction = !transaction._id ? true : false;
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose(null);
        }
    };

    const handleCloseButtonClick = () => {
        onClose(null);
    };

    const [type, setType] = useState(transaction.type);
    const [description, setDescription] = useState(transaction.description);
    const [category, setCategory] = useState(transaction.category);
    const [value, setValue] = useState(transaction.value);
    const [transactionDate, setTransactionDate] = useState(() => {
        return (
            !isNewTransaction &&
            transaction.year +
                '-' +
                formatLeadingZeros(transaction.month, 2) +
                '-' +
                formatLeadingZeros(transaction.day, 2)
        );
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();

        transaction.type = type;
        transaction.description = description;
        transaction.category = category;
        transaction.value = value;
        transaction.day = transactionDate.split('-')[2];
        transaction.month = transactionDate.split('-')[1];
        transaction.year = transactionDate.split('-')[0];
        transaction.yearMonth = transactionDate.substring(0, 6);
        transaction.yearMonthDay = transactionDate;

        onSave(transaction);
    };

    const handleRadioChange = ({ target }) => {
        transaction.type = target.name === 'income' ? '+' : '-';
        setType(transaction.type);
    };

    const handleInputChange = ({ target }) => {
        switch (target.name) {
            case 'description':
                setDescription(target.value);
                break;
            case 'category':
                setCategory(target.value);
                break;
            case 'value':
                setValue(parseFloat(target.value));
                break;
            case 'date':
                setTransactionDate(target.value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <Modal isOpen={true}>
                <form onSubmit={handleFormSubmit}>
                    <div style={styles.flexRow}>
                        <span style={styles.title}>
                            {isNewTransaction
                                ? 'Novo lançamento'
                                : 'Edição de lançamento'}
                        </span>
                        <a
                            className="btn red"
                            href="#!"
                            onClick={handleCloseButtonClick}
                        >
                            x
                        </a>
                    </div>
                    <label>
                        <input
                            name="income"
                            onChange={handleRadioChange}
                            type="radio"
                            checked={type === '+' ? true : false}
                            disabled={!isNewTransaction}
                        />
                        <span className="green-text">Receita</span>
                    </label>
                    <label>
                        <input
                            name="expense"
                            onChange={handleRadioChange}
                            type="radio"
                            checked={type === '-' ? true : false}
                            disabled={!isNewTransaction}
                        />
                        <span className="red-text">Despesa</span>
                    </label>
                    <div className="input-field">
                        <input
                            name="description"
                            id="description"
                            type="text"
                            required
                            value={description}
                            onChange={handleInputChange}
                        ></input>
                        <label className="active" htmlFor="description">
                            Descrição:{' '}
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            name="category"
                            id="category"
                            type="text"
                            required
                            value={category}
                            onChange={handleInputChange}
                        ></input>
                        <label className="active" htmlFor="category">
                            Categoria:{' '}
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            name="value"
                            id="value"
                            required
                            type="number"
                            value={value}
                            onChange={handleInputChange}
                        ></input>
                        <label className="active" htmlFor="value">
                            Valor:{' '}
                        </label>
                    </div>
                    <div className="input-field">
                        <input
                            name="date"
                            id="date"
                            required
                            type="date"
                            value={transactionDate}
                            onChange={handleInputChange}
                        ></input>
                        <label className="active" htmlFor="date">
                            Data:{' '}
                        </label>
                    </div>
                    <button className="waves-effect waves-light btn teal darken-3">
                        <i className="material-icons left">save</i>Salvar
                    </button>
                </form>
            </Modal>
        </div>
    );
};

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
};
