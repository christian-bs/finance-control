import React from 'react';
import { currencyFormat } from '../../helper.js';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
    const { _id: id, category, description, day, value, type } = transaction;
    const style = `card-panel col s12 m6 ${type === '+' ? 'green' : 'red'}`;
    const styleChilds = { padding: 2, margin: 2 };
    const handleDelete = () => {
        onDelete(id);
    };
    const handleEdit = () => {
        onEdit(transaction);
    };

    return (
        <div style={{ padding: 1, margin: 5 }} className={style}>
            <div
                id={id}
                style={styleChilds}
                className="white-text row valign-wrapper"
            >
                <div style={styleChilds} className="col s1">
                    {('0' + day).slice(-2)}
                </div>
                <div style={styleChilds} className="col s7">
                    <span className="col s7 left-align">{category}</span>
                    <span className="col s7 left-align">{description}</span>
                </div>
                <div style={styleChilds} className="col s2">
                    {currencyFormat(value)}
                </div>
                <div
                    className="col s2 row"
                    style={{
                        justifyContent: 'space-between',
                        marginBottom: '2px',
                    }}
                >
                    <a style={styleChilds} className="btn-flat row" href="#!">
                        <i
                            onClick={handleEdit}
                            style={styleChilds}
                            className="material-icons"
                        >
                            edit
                        </i>
                    </a>

                    <a style={styleChilds} className="btn-flat row" href="#!">
                        <i
                            onClick={handleDelete}
                            style={styleChilds}
                            className="material-icons"
                        >
                            delete
                        </i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
