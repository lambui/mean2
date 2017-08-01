//init express
const express = require("express");
const app = express();

//init port #
const port = 3000;

//body parser
const bodyparser = require("body-parser");
app.use(bodyparser.json()); //to parse json, to use req.body

//cors https://www.npmjs.com/package/cors
const cors = require("cors");
const corsOptions = {
    origin: '*' //enable for all origins
};
app.use(cors());

//database mongodb with mongoose
const databaseConfig = require('./config/database');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //use ES6 promise
mongoose.connect(databaseConfig.database, {useMongoClient: true})
        .then(() => {
            console.log("Connected to Mongodb at " + databaseConfig.database);
        })
        .catch(err => {
            console.log("Database connection error: " + err);
        });

//define routes
    //default route
app.get('/', (req, res) => {
    res.send("Invalid endpoint!");
});

    //first subroute
const first = require('./routes/first');
app.use('/first', first);

//start app on port
app.listen(port, () => {
    console.log("Server starts on port " + port);
});