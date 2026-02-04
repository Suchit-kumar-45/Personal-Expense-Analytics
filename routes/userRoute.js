const express = require('express');
const { loginController, registerController } = require('../controllers/userController');

//router object 
const router=express.Router();

//routers
//POST || login
router.post('/login', loginController);

//POST || register
router.post('/register',registerController);


module.exports=router;