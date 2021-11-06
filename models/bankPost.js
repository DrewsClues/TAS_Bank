const mongoose = require('mongoose');



// SCHEMA
const Schema = mongoose.Schema;
const BankPostSchema = new Schema({
    name: String,
    email: String,
    password: String,
    accountnumber: Number,
    balance: Number,
    date: {
        type: String,
        default: Date.now()
    }
}); 

// Model 
const BankPost = mongoose.model('BankPost', BankPostSchema);

module.exports = BankPost;