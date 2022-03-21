var express = require('express');
var router = express.Router();
var CountNumber = require('./../model/counterModel.js');

let numberObject = new CountNumber.CountNumber();


router.get('/get', function(req, res) {
    res.send(numberObject.getCount().toString());
});

router.get('/set', function(req, res) {
    res.send("Set number successfully!");
    numberObject.incrementCount();
});


module.exports = router;
