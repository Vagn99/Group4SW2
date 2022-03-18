var express = require('express');
var router = express.Router();
let names = ["admin", "user1", "user2", "user3", "user4", "user5", "user6"];
let passwords = ["admin", "user1", "user2", "user3", "user4", "user5", "user6"];

router.post('/', function(req, res) {
  const { name, password } = req.body;
  req.session = req.body;
  console.log(req.session);
  for(i in names){
    if(names[i] === name){
      if(passwords[i] === password){
        res.render("success", {
          username: name,
        });
      }
    }
  }
  res.send('Login failed');
});

module.exports = router;
