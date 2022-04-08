var express = require('express');
var router = express.Router();

let users = new Map();
users.set("admin", "admin");
users.set("user1", "user1");
users.set("user2", "user2");
users.set("user3", "user3");
users.set("user4", "user4");
users.set("user5", "user5");
users.set("user6", "user6");

router.post('/', function(req, res) {
  console.log("LOGIN!")
  const { name, password } = req.body;
  req.session = {
    name: name,
    loggedIn: true,
  };
  console.log(req.session);
  if(users.get(name) === password){
    res.render("success", {
      username: name,
    });
  }
  else{
    res.send('Login failed');
  }
});

router.get('/', function(req, res, next) {
  if (req.session.loggedIn == true){
    res.render("success", {
      username: req.session.name,
    });
  } else {
    res.render('index', {title: 'Travian rip off'});
  }
});

router.get('/logout', function(req, res, next) {
  req.session.loggedIn = false;
  console.log(req.session);
  res.render('index', { title: 'Travian rip off' });
});



module.exports = router;
