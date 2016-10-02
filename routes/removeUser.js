var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');


/* GET users listing. */
router.post('/removeUser', function(req, res, next) {

  if(req.session.admin == "admin") {
    var id =  req.body.user_ID;
    User.remove({_id : id },function(err) {
      if(err)
        return console.log(err)
      res.send({valid : 1 , redirect : '/admin'});
    })
    }
});


module.exports = router;
