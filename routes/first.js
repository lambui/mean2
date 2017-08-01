const express = require("express");
const router = express.Router();
const people = require("../models/firstModel");

router.get('/', (req, res, next) => {
    let msg = "GET first/"
    console.log(msg);
    res.send(msg);
});

router.post('/add', (req, res, next) => {
    let newPerson = new people({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DOB: req.body.DOB
    });
    
    people  .AddPeople(newPerson)
            .then(saved => {res.send(saved)})
            .catch(err => console.log("error: " + err));
});

router.get('/all', (req, res, next) => {
    people  .find({})
            .exec()
            .then(list => {
                res.send(list);
                console.log(list);
            })
            .catch(err => console.log("error: " + err));
});

module.exports = router;