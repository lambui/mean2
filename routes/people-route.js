const express = require("express");
const router = express.Router();
const people = require("../models/people-model");

function PrintError(err)
{
    console.log("error: " + err);
}

router.get('/', (req, res, next) => {
    let msg = "GET people/"
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
            .catch(err => PrintError(err));
});

router.get('/all', (req, res, next) => {
    people  .find({})
            .exec()
            .then(list => {
                res.send(list);
                console.log(list);
            })
            .catch(err => PrintError(err));
});

router.delete('/delete', (req, res, next) => {
    people  .find({_id: req.query._id})
            .remove()
            .exec()
            .then(() => {
                console.log("succesfully delete " + req.query._id);
                res.send("succesfully delete " + req.query._id);
            })
            .catch(err => PrintError(err));
});

//declare child routes
const detailChildRoute = require('./people-detail-route');
router.use('/detail', detailChildRoute);

module.exports = router;