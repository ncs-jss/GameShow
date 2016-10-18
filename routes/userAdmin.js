var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');


/* GET users listing. */
router.get('/userAdmin', function(req, res, next) {


  if(req.session.admin && req.session.admin == 'admin'){
	  User.find({})
	  .sort({'score' : -1, 'lastAttemptTime' : 1})
	  .select({email_ID : 1,name : 1,year : 1,score :1 , level :1,avatar : 1,badges : 1,password : 1})
	  .limit().exec(function(err, result) {
	    if(err)
	      return console.log(err);
	    res.send(result);

	  })
	}
	else
		res.redirect('/adminLogin');
});



module.exports = router;
