const mongoose=require('mongoose');

//schema design
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
    },  

    password:{
        type:String,
        required:[true,'Password is required'],
    },

},{
    timestamps:true,
});
//export
module.exports=mongoose.model('Users',userSchema);
