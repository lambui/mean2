const express = require("express");
const router = express.Router({mergeParams: true}); //for child route to access parent route params (mergeParams: true)
const peopleDetail = require("../models/people-detail-model");

function PrintError(err)
{
    console.log("error: " + err);
}

router.post('/create', (req, res, next) => {
    peopleDetail.CreateDetailList(req.body.peopleId)
                .then(newDetailList => res.send(newDetailList))
                .catch(err => PrintError(err));
});

router.delete('/remove', (req, res, next) => {
    peopleDetail.find({peopleId: req.query.peopleId})
                .remove()
                .exec()
                .then(() => {
                    res.send("successfully delete detail list");
                })
                .catch(err => PrintError(err));
});

router.post('/add', (req, res, next) => {
    peopleDetail.AddDetailToPeople(req.body.peopleId, req.body.detailBody)
                .then(detailList => res.send(detailList))
                .catch(err => PrintError(err));
});

router.get('/:id', (req, res, next) => {
    peopleDetail.GetDetailsByPeopleId(req.params.id)
                .then(detailList => res.send(detailList))
                .catch(err => PrintError(err));
});

module.exports = router;
