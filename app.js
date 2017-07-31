//init express
const express = require("express");
const app = express();

//init port #
const port = 3000;

//cors https://www.npmjs.com/package/cors
const cors = require("cors");
const corsOptions = {
    origin: '*' //enable for all origins
};
app.use(cors());

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