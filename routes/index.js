var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo');
/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.session.email);
  if(req.session.email && req.session.email != "") {
  User.find({email_ID :req.session.email}).exec(function(err,result){
		//console.log('reached request');
  		if(result)
      res.sendFile('/views/front/Dashboard.html',{root : '.'});

  	else
  		req.session.destroy(function(err) {
  			if(err)
  				return res.send(err);
  			res.redirect('/login');

  		})
    })
}
else
res.redirect('/login');
});

module.exports = router;
