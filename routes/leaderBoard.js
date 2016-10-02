var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');


/* GET users listing. */
router.get('/leaderBoard', function(req, res, next) {

  
  User.find({})
  .sort({'score' : -1, 'lastAttemptTime' : 1})
  .select({email_ID : 1,name : 1,year : 1,score :1 , level :1})
  .limit(req.query.limit).exec(function(err, result) {
    if(err)
      return console.log(err);
    res.send(result);


  })
  

});



module.exports = router;
