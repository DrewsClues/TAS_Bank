const BankPost = require('../models/bankPost');

//Return All data
function alldata(){
    return new Promise((resolve, reject) => {
        BankPost.find({ })
        .then((data) => {
         resolve(data)
        })
        .catch(() => {
            reject("Failed")
            return;
        })
    

    })
}

//Create New Account
function createAccount(name, email, password) {
    return new Promise((resolve, reject) => {
    //Generates random 10 digit account number
    function generateAccount(length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    }
    let random_account = generateAccount(10);
    const data = {
        name: name,
        email: email,
        password: password,
        accountnumber: random_account,
        balance: 0
    }

    const newBankPost = new BankPost(data);
    

    newBankPost.save((error) => {
        if (error) {
            res.status(500).json({
                msg: 'Sorry, internal server errors'});
            return;
        } 
        return
            res.json({
                msg: 'Your data has been saved!'
        })
    });

    })
}


//Find Single User

function FindbyEmail(email, password){
    return new Promise((resolve, reject) => {
    BankPost.find({email})
    .then((data) =>{
        if(data[0].password === password){
          resolve(data)  
        }
        else{
            reject("User error!")
        }
    })
    }) 
}



//Find and Update Balance
function UpdateUserBalance(email, amount){
    return new Promise((resolve, reject) => {
        BankPost.findOneAndUpdate(
            {email : email},
            { $inc: {balance: Number(amount)}},
            { returnOriginal: false},
            (error, data) => {
                if(error){
                    reject(error)
                }
                else{
                    resolve(data)
                }
            }
        )
    })
}


module.exports = {alldata, createAccount, FindbyEmail, UpdateUserBalance};