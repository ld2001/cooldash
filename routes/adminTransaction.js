const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
});

const express = require('express');
const router = express.Router(); 
const transaction_db = require('../models/transaction');   // daily log of trading
const prediction_db = require('../models/prediction');     // algorithm prediction and actual turnout

var ddb = new AWS.DynamoDB();


// // get a list of transactions from the db
// router.route('/').get((req, res) => {
//     if 


// });

// post it on the database
router.route('/add').post((req, res) => {
    
    // ddb.listTables({ Limit: 10 }, function (err, data) {
    //     if (err) {
    //         console.log("Error", err.code);
    //     } else {
    //         console.log("Table names are ", data.TableNames);
    //     }
    // });
   
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

// // get item from the database
// router.route('/:id').get((req, res) => { 

// });


module.exports = router; 