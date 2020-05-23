'use strict';

const express = require('express');
const path = require('path');
const app = express(); 
app.use(express.static(path.join(__dirname, "cooldash", "build")));

// Constants
const port = 80;
// const HOST = '0.0.0.0';

// App
app.get('/', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, "cooldash", "build", "index.html"));
});

app.listen(port, () => { 
    console.log(`Listening on port ${port}`);
})