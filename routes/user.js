//send user details

var express = require('express');
var router = express.Router();
var user = require('../Models/userInfo.js');


router.get('/user', function(req, res) { 
	console.log('req recieved for user with sess.email =' + req.session.email );
	if(req.session.email) {
		user.findOne({email_ID : req.session.email}, function(err, result) {
			if(err)
				return console.log(err);
			if (result) {
				res.send({
				email : result.email_ID,
				name : result.name,
				year : result.year,
				avatar : result.avatar,
				level : result.level,
				score : result.score,
				badges : result.badges
				});
			}
			else
				res.send("some major problem");
		})
	}
	else
		res.send({valid : 0 , redirect :'/login'});

	   
});
module.exports = router;