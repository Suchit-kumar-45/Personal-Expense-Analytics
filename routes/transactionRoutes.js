const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionCtrl');


//router object 
const router=express.Router();

//routers
//add transaction POST method
router.post('/add-transaction', addTransaction);

//get all transactions GET method
router.post('/get-all-transactions', getAllTransactions);


module.exports=router;