var express = require('express');
var router =  express.Router();
var questionAssigned = require('../Models/questionAssigned.js');
var user = require('../Models/userInfo.js');


router.post('/checkAnswer', function(req, res) {
	if(req.session.email && req.session.level) {

		questionAssigned.findOne({user_ID : req.session.email, level : req.session.level}).populate('question_ID')
		.exec(function (err, result) {
			if(err)
				return console.log(err);
			if(result) {
				console.log('the result is' + result );
				if(req.body.answer) {
					console.log("the answercoming from req is "+ req.body.answer);
					console.log('the TechnicalAnswer answer is'+ result.question_ID.technicalAnswer )
					console.log('the nonTechnicalAnswer answer is'+ result.question_ID.nonTechnicalAnswer )
					console.log('now lets have this ' + (req.body.answer == result.question_ID.technicalAnswer));
					if(req.body.answer == result.question_ID.technicalAnswer) {
						console.log("technicalAnswer Matched");
						user.findOne({email_ID : req.session.email}, function(err, data) {
							data.score +=10;
							data.lastAttemptTime = Date.now();
							data.level ++;
							result.timeOfCompletion  = Date.now();
							result.duration = result.timeOfCompletion.getTime()-result.timeOfAssignment.getTime();
							data.save(function(err) {
								if (err){
									console.log("err while saving data");
									return console.log(err);
								}

							});
							result.save(function(err) {
								if (err){console.log("err while saving result");
									return console.log(err);
								}

							});
							req.session.level = data.level;
							res.send({valid: 1, redirect:'/'});

						});
					}

					else if(req.body.answer ==  result.question_ID.nonTechnicalAnswer) {
						user.findOne({email_ID : req.session.email}, function(err, data) {
							data.score +=5;
							data.lastAttemptTime = Date.now();
							data.level ++;
							result.timeOfCompletion  = Date.now();
							result.duration = result.timeOfCompletion.getTime()-result.timeOfAssignment.getTime();
							data.save(function(err) {
								if (err){
									console.log("err while saving data");
									return console.log(err);
								}

							});
							result.save(function(err) {
								if (err){console.log("err while saving result");
									return console.log(err);
								}

							});
							req.session.level = data.level; 	
							res.send({valid: 1, redirect:'/'});

						});
					}
					else {
						console.log("no Answer Matched");
						res.send({valid : 0, comment : "incorrect choice"});
					}

				}
				else
					res.send({valid : 0, comment : "no answer received"});
				


			}
		} )
	}
	else
		req.redirect('/');
});

module.exports = router;