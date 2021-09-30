const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        min:10,
        max:100,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        min:9,
        max:15,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3
    },
    
},
{
    timestamps:true
}
);

module.exports = mongoose.model('BankUser',bankSchema);