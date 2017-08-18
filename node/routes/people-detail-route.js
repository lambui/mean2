const express = require("express");
const router = express.Router({mergeParams: true}); //for child route to access parent route params (mergeParams: true)
const peopleDetail = require("../models/people-detail-model");
const alertTag = require('../models/alert-tag-model');

function PrintError(err, res)
{
    console.log("error: " + err);
    if(res != null)
        res.send({error: true, msg: err});
}

router.post('/create', (req, res, next) => {
    peopleDetail.CreateDetailList(req.body.peopleId)
                .then(newDetailList => res.send(newDetailList))
                .catch(err => PrintError(err));
});

router.delete('/destroy', (req, res, next) => {
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

router.put('/remove', (req, res, next) => {
    peopleDetail.RemoveDetailFromList(req.body.peopleId, req.body.detailId)
                .then(() => res.send("successfully remove a detail in detailList"))
                .catch(err => PrintError(err));
});

router.get('/:id', (req, res, next) => {
    peopleDetail.GetDetailsByPeopleId(req.params.id)
                .then(detailList => res.send(detailList))
                .catch(err => PrintError(err));
});

router.get('/:id/alerttags', (req, res, next) => {
    alertTag.GetAllAlertTagsOfPerson(req.params.id)
            .then(tags => res.send(tags))
            .catch(err => PrintError(err));
});

router.get('/:id/:detailId', (req, res, next) => {
    peopleDetail.GetDetail(req.params.id, req.params.detailId)
                .then(detail => res.send(detail))
                .catch(err => PrintError(err));
});

//declare child routes
const detailViewRoute = require('./detail-view-route');
router.use('/:id/:detailId', detailViewRoute);

module.exports = router;
