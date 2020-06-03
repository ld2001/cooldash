const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
});

const express = require('express');
const router = express.Router(); 
const prediction_db = require('../models/prediction');     // algorithm prediction and actual turnout

var ddb = new AWS.DynamoDB();
// var docClient = new AWS.DynamoDB.DocumentClient();

// get a list of predictions from the db
router.route('/').get((req, res) => {

    var params = {
        TableName: 'predictions',
    }
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", JSON.stringify(err, null, 2));
        } else {
            res.json(data.Items);
        }
    })
});

// post it on the database
router.route('/add').post((req, res) => {
    
    const pred_id = req.body.pred_id;
    const date = req.body.date; 
    const ticker = req.body.ticker;
    const predicted = req.body.predicted;
    const actual = req.body.actual;

    ddb.createTable(prediction_db, function (err, data) { 
        if (err) {
            console.log("Error", err);
        } else { 
            console.log("Table Created", data);
        }
    })

    var item = {
        TableName: 'predictions',
        Item: {
            'pred_id': {S: pred_id},
            'date': { S: date },
            'ticker': { S: ticker }, 
            'predicted': { N: predicted },
            'actual': {N: actual}
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
        TableName: 'predictions',
        Key: {
            'pred_id': {S: req.params.id}
        },
    }

    ddb2.deleteItem(item, function (err, data) { 
        if (err) {
            console.log("Error", err);
        } else { 
            console.log("Success - delete", data);
        }
    })
});

module.exports = router; 