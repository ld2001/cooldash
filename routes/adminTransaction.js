const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
});

const express = require('express');
const router = express.Router(); 
const transaction_db = require('../models/transaction');   // daily log of trading
const prediction_db = require('../models/prediction');     // algorithm prediction and actual turnout

var ddb = new AWS.DynamoDB();
// var docClient = new AWS.DynamoDB.DocumentClient();

// get a list of transactions from the db
router.route('/').get((req, res) => {

    var params = {
        TableName: 'transactions',
    }
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", JSON.stringify(err, null, 2));
        } else {
            // var results = JSON.stringify(data, null, 2);
            res.json(data.Items);
            // console.log("success", results);
        }
    })
});

// post it on the database
router.route('/add').post((req, res) => {
    
    // ddb.listTables({ Limit: 10 }, function (err, data) {
    //     if (err) {
    //         console.log("Error", err.code);
    //     } else {
    //         console.log("Table names are ", data.TableNames);
    //     }
    // });
  
    // const trans_id = Date.now().toString();
    const trans_id = req.body.trans_id;
    const date = req.body.date; 
    const ticker = req.body.ticker;
    const order = req.body.order;
    const num_share = req.body.num_share;
    const per_share_price = req.body.per_share_price;

    ddb.createTable(transaction_db, function (err, data) { 
        if (err) {
            console.log("Error", err);
        } else { 
            console.log("Table Created", data);
        }
    })

    var item = {
        TableName: 'transactions',
        Item: {
            'trans_id': {S: trans_id},
            'date': { S: date },
            'ticker': { S: ticker }, 
            'order': { S: order },
            'num_share': { N: num_share },
            'per_share_price': {N: per_share_price}
        }
    }

    ddb.putItem(item, function (err, data) { 
        if (err) {
            console.log("Error", err);
        } else { 
            console.log("Success", data);
        }
    });
});

// delete item from the database
router.route('/:id').delete((req, res) => { 
    
    console.log(req.param.id);
    
    var item = {
        TableName: 'transactions',
        Key: {
            'trans_id': {S: req.params.id}
        },
    }

    console.log("here at admin " + req.params.id.toString());

    ddb.deleteItem(item, function (err, data) { 
        if (err) {
            console.log("Error", err);
        } else { 
            console.log("Success - delete", data);
        }
    })
});


module.exports = router; 