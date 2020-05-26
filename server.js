'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'cooldash/build')));
app.use(bodyParser.json());     // to accept json file

// initialize routes
app.use('/adminTransaction', require('./routes/adminTransaction'));

// error handling middleware
app.use(function (err, req, res, next) { 
    res.status(422).send({ error: err.message });
});

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "cooldash", "build")));

// Constants
// const port = 80;        // for aws ecs deployment
const port = 8080;   // for local testing

// App
app.get('*', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, "cooldash", "build", "index.html"));
});

app.listen(port, () => { 
    console.log(`Listening on port ${port}`);
})