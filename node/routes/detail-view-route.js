const express = require("express");
const router = express.Router({mergeParams: true}); //for child route to access parent route params (mergeParams: true)
const alertTag = require('../models/alert-tag-model');

function PrintError(err, res)
{
    console.log("error: " + err);
    if(res != null)
        res.send({error: true, msg: err});
}

router.get('/alerttags', (req, res, next) => {
    alertTag.GetAllAlertsTagOfDetail(req.params.id, req.params.detailId)
            .then(tags => res.send(tags))
            .catch(err => PrintError(err, res));
});

router.post('/alerttags/add', (req, res, next) => {
    alertTag.AddAlertTagToDetail(req.params.id, req.params.detailId, req.body.alertType, req.body.msg)
            .then(savedTag => res.send(savedTag))
            .catch(err => PrintError(err, res));
});

module.exports = router;