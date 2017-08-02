//init express
const express = require("express");
const app = express();

//init port #
const port = 3000;

//set up static folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

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
const peopleRoute = require('./routes/people-route');
app.use('/people', peopleRoute);

//start app on port
app.listen(port, () => {
    console.log("Server starts on port " + port);
});