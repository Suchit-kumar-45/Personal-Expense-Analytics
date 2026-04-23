const transactionModel = require("../models/transactionModel");
const moment = require('moment');


// GET ALL TRANSACTIONS
const getAllTransactions = async (req, res) => {
    try {

        const { frequency, selectedDate, type } = req.body; const userid = req.user._id.toString();

        let query = { userid };

        // Date filter
        if (frequency !== "custom") {
            query.date = {
                $gte: moment().subtract(Number(frequency), 'days').toDate()
            };
        }
        else if (selectedDate && selectedDate.length === 2) {
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



// EDIT TRANSACTION
const editTransaction = async (req, res) => {

    try {

        const payload = req.body.payload;
        if (payload.date) {
            payload.date = new Date(payload.date);
        }

        await transactionModel.findByIdAndUpdate(
            req.body.transactionId,
            payload
        );

        res.status(200).json({
            success: true,
            message: "Transaction Edited Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error Editing Transaction"
        });

    }

};

//Delete Transaction
const deleteTransaction= async(req,res)=>{
    try{
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction Deleted Successfully');
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json(error)
    }

};

// ADD TRANSACTION
const addTransaction = async (req, res) => {

    try {

        req.body.userid = req.user._id;
        const newTransaction = new transactionModel(req.body);
        if (req.body.date) {
            newTransaction.date = new Date(req.body.date);
        }

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


module.exports = {
    getAllTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
};