var express = require('express');
var CountNumber = require('./../model/counterModel.js');
var router = express.Router();
let numberObject = new CountNumber();

router.get('/get', function(req, res) {
    res.send(numberObject.getCount().toString());
});

router.get('/set', function(req, res) {
    res.send("Set number successfully!");
    numberObject.incrementCount();
});


module.exports = router;
