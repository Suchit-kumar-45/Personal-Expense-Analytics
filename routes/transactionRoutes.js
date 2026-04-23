const express = require('express');
const authMiddleware = require("../config/authMiddleware");
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionCtrl');


//router object 
const router=express.Router();

//routers
//add transaction POST method
router.post('/add-transaction', authMiddleware, addTransaction);

//Edit transaction POST method
router.post('/edit-transaction', authMiddleware, editTransaction);

//Delete transaction POST method
router.post('/delete-transaction', authMiddleware, deleteTransaction);

//get all transactions GET method
router.post('/get-all-transactions', authMiddleware, getAllTransactions);


module.exports=router;