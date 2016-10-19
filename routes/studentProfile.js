var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');
var questionAssigned = require('../Models/questionAssigned.js');
var question = require ('../Models/question.js');


router.get('/studentProfile', function(req,res){
	if(!req.session.admin) 
		 return res.redirect('/login');

	var user_ID =  req.query.user;



	// All the code for gettimg question.

	questionAssigned.find({'user_ID' : user_ID })
	.sort({level : -1})
	.populate('question_ID')
	.exec(function(err,result) {
			if(err)
				console.log(err);
			res.send(result);
	});

});


module.exports = router;