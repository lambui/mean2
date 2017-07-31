const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    let msg = "GET first/"
    console.log(msg);
    res.send(msg);
});

module.exports = router;