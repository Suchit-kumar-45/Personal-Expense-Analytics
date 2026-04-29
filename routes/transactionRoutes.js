const express = require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionCtrl');
const authMiddleware = require('../config/authMiddleware');


//router object 
const router=express.Router();

//routers

// All transaction routes are protected
router.post('/add-transaction', authMiddleware, addTransaction);
router.post('/edit-transaction', authMiddleware, editTransaction);
router.post('/delete-transaction', authMiddleware, deleteTransaction);
router.post('/get-all-transactions', authMiddleware, getAllTransactions);


module.exports=router;