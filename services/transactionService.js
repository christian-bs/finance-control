import TransactionModel from '../models/TransactionModel.js';

const getPeriodTransactions = async (req, res) => {
    const yearMonth = req.params.period;

    try {
        if (!yearMonth) {
            throw new Error(
                'É necessário informar o periodo no format "yyyy-mm"'
            );
        }

        const transactions = await TransactionModel.find({ yearMonth });

        res.send(transactions);
    } catch (error) {
        res.status(500).send(
            `Erro ao recuperar as transações do mês - Erro:${error}`
        );
    }
};

const getTransaction = async (req, res) => {
    const description = req.query.description;
    try {
        const transaction = await TransactionModel.find({
            description: { $regex: description },
        });

        res.send(transaction);
    } catch (error) {
        res.status(500).send(
            `Erro ao recuperar as transações com a descrição solicitada - Erro:${error}`
        );
    }
};

const insertTransaction = async (req, res) => {
    try {
        const newTransaction = req.body;
        const {
            description,
            value,
            category,
            year,
            month,
            day,
            type,
        } = newTransaction;

        if (
            !description ||
            value === 0 ||
            !category ||
            year === 0 ||
            month === 0 ||
            day === 0 ||
            !type
        ) {
            throw new Error('Todos os campos são obrigatórios');
        }

        await TransactionModel.create({
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth: `${year}-${formatLeadingZeros(month)}`,
            yearMonthDay: `${year}-${formatLeadingZeros(
                month
            )}-${formatLeadingZeros(day)}`,
            type,
        });

        res.status(200).send();
    } catch (error) {
        res.status(500).send(`Erro ao inserir a transação - Erro:${error}`);
    }
};

const formatLeadingZeros = (qty) => {
    return qty.toString().padStart(2, '0');
};

const updateTransaction = async (req, res) => {
    const newTransaction = req.body;
    const {
        _id,
        description,
        value,
        category,
        year,
        month,
        day,
    } = newTransaction;

    if (
        !_id ||
        !description ||
        value === 0 ||
        !category ||
        year === 0 ||
        month === 0 ||
        day === 0
    ) {
        throw new Error('Todos os campos são obrigatórios');
    }
    try {
        const updatedTransaction = await TransactionModel.findOneAndUpdate(
            { _id: _id },
            {
                $set: {
                    description,
                    value,
                    category,
                    year,
                    month,
                    day,
                    yearMonth: `${year}-${formatLeadingZeros(month)}`,
                    yearMonthDay: `${year}-${formatLeadingZeros(
                        month
                    )}-${formatLeadingZeros(day)}`,
                },
            },
            { new: true, useFindAndModify: false }
        );
        res.status(200).send(updatedTransaction);
    } catch (error) {
        res.status(500).send(`Erro ao atualizar a transação - Erro:${error}`);
    }
};

export default {
    getPeriodTransactions,
    getTransaction,
    insertTransaction,
    updateTransaction,
};
