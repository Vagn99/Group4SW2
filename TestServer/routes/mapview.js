var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn == false){
        res.render('index', {title: 'Travian rip off'});
    } else {
        res.render('mapview');
    }
});

router.get('/start', function (req,res){
    // Should send an object with visible values
    res.send(getValues());
});

router.get('/update', function (req,res){
    // Should send an object with visible values
    res.send(getValues());
});

// This function should return an object with visible values for start and update
function getValues(){
    return "";
}


module.exports = router;