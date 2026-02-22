const transactionModel = require("../models/transactionModel");
const moment = require('moment');

const getAllTransactions = async (req, res) => {
    try {
        const { frequency, userid, selectedDate, type } = req.body;

        let query = { userid };

        // Date filter
        if (frequency !== "custom") {
            query.date = {
                $gte: moment().subtract(Number(frequency), 'days').toDate()
            };
        } else if (selectedDate && selectedDate.length === 2) {
            query.date = {
                $gte: moment(selectedDate[0]).toDate(),
                $lte: moment(selectedDate[1]).toDate()
            };
        }

        // Type filter
        if (type && type !== 'all') {
            query.type = type;
        }

        const transactions = await transactionModel.find(query);

        res.status(200).json({
            success: true,
            transactions
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching transactions"
        });
    }
};

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();

        res.status(201).json({
            success: true,
            message: "Transaction Added Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding transaction"
        });
    }
};

module.exports = { getAllTransactions, addTransaction };