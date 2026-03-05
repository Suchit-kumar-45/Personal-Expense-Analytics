const express = require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionCtrl');


//router object 
const router=express.Router();

//routers
//add transaction POST method
router.post('/add-transaction', addTransaction);

//Edit transaction POST method
router.post('/edit-transaction', editTransaction);

//Delete transaction POST method
router.post('/delete-transaction', deleteTransaction);

//get all transactions GET method
router.post('/get-all-transactions', getAllTransactions);


module.exports=router;