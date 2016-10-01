var express = require(express);
var router =  express.Router;
var questionAssigned = require('../Models/questionAssigned.js');
var user = require('../Models/userInfo.js');


router.post(req, res) {
	if(req.session.email && req.session.level) {
		questionAssigned.findOne({user_ID : req.session.email}, level : req.session.level}).populate(question_ID)
		.exec(function (err, result) {
			if(err)
				return console.log(err);
			if(result) {
				if(req.body.answer == result.question_ID.technicaAnswer) || req.body.answer == result.question_ID.nonTechnicaAnswer) {
					userInfo.findOne({email_ID : req.session.email}, function(err, data) {
						data.score +=10;
						data.lastAttemptTime = Date.now();
						data.level ++;
						res.redirect('/');

					});
				}

				if(req.body.answer ==  result.question_ID.nonTechnicaAnswer) {
					userInfo.findOne({email_ID : req.session.email}, function(err, data) {
						data.score +=5;
						data.lastAttemptTime = Date.now();
						data.level ++;
						res.redirect('/');

					});
				}


			}
		} )
	}
	else
		req.redirect('/');
}