const express   = require('express');
const router    = express.Router();
const BankPost  = require('../models/bankPost');
const dals      = require('./dal');
//Routes
router.get('/', (req, res) =>{
    const data = {
        welcome: "Hello! Welcome to mernapp!"
    };
    res.json(data.welcome);
})

//Return All Data
router.get('/data', function(req, res) {
        dals.alldata()
            .then((data) => {
                console.log(data);
                res.json(data)
            });
});

//Create an Account
router.get('/create/account/:name/:email/:password', function (req, res) {
    dals.createAccount(req.params.name, req.params.email, req.params.password)
        .then((data) => {
            console.log(data);
            res.send(data);
        })
})

//Find User
router.get('/login/:email/:password', (req, res) =>{
        dals.FindbyEmail(req.params.email, req.params.password)
            .then((data) => {
                console.log(data);
                res.send(data);
            })
            .catch(() =>{
                res.send("Login Rejected")
            })
})

//Find and Update
router.get('/updateBalance/:email/:amount', (req, res) =>{
        dals.UpdateUserBalance(req.params.email, req.params.amount)
            .then((data) => {
                console.log(data)
                res.send(data)
            })
            .catch(() => {
                res.send("error")
            })
})



module.exports = router;