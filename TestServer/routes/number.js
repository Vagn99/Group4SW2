var express = require('express');
var router = express.Router();
let count = 69;

router.get('/get', function(req, res) {
    res.send(count.toString());
});

router.get('/set', function(req, res) {
    res.send("Set number successfully!");
    count++;
});


module.exports = router;
