const  mongoose=require('mongoose');

const transactionSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:[true,'user id is required']
    },
    amount:{
        type:Number,
        required:[true,'amout is required']
    },
    type: {        
    type: String,
    required: true
    },

    category:{
        type:String,
        required:[true,'category is required']
    },
    reference:{
        type:String
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    date:{
        type:Date,
        required:[true,'date is required']
    }

},{timestamps:true});

const transactionModel=mongoose.model('transactions',transactionSchema);
module.exports=transactionModel;