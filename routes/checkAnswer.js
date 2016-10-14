var express = require('express');
var router =  express.Router();
var questionAssigned = require('../Models/questionAssigned.js');
var user = require('../Models/userInfo.js');
var question = require('../Models/question.js');

router.post('/checkAnswer', function(req, res) {
	if(req.session.email && req.session.level) {
		var badgesCouldBeWon = false ;
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

					if((req.body.answer == result.question_ID.technicalAnswer )||(req.body.answer ==  result.question_ID.nonTechnicalAnswer)){
						var badgeWon = false;

						question.find({level : req.session.level}).exec(function (err, multi) {
							if(multi.length>1)
								badgesCouldBeWon = true


							questionAssigned.find({ level : req.session.level, duration : {$gte: 1}}).populate('question_ID')
							.exec(function (err, isAnswered) {
								console.log("the value")
							 if(isAnswered.length==0) {
							 	var badgeWon = true;
							 	}


								if(req.body.answer == result.question_ID.technicalAnswer) {
									console.log("technicalAnswer Matched");
									user.findOne({email_ID : req.session.email}, function(err, data) {
										data.score +=10;
										data.lastAttemptTime = Date.now();
										data.level ++;
										if(badgesCouldBeWon&&badgeWon){
											data.badges.push({
												name : 'FastestFingers',
												level : req.session.level,
												timeOfAssignment : Date.now()
											});
										}
										if(badgesCouldBeWon){
											data.badges.push({
													name : 'MileStone',
													level : req.session.level,
													timeOfAssignment : Date.now()
												});
										}
										result.timeOfCompletion  = Date.now();
										result.duration = result.timeOfCompletion.getTime()- result.timeOfAssignment.getTime();
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

										 // question.findOne()
									  //    .sort({level : -1})
									  //    .exec(function(err , result) {
									  //    	if(err)
									  //    		console.log(err);
									  //    	else
									  //    	{
									  //    		console.log({maxLevel : result.level});
									  //    		if(data.level > result.level)
											// 		return res.send({valid: 1, redirect:'/winner'});
											// 	else
											// 		return res.send({valid: 1, redirect:'/'});
									  //    	}
									  //    });
									});
								}

								else if(req.body.answer ==  result.question_ID.nonTechnicalAnswer) {
									user.findOne({email_ID : req.session.email}, function(err, data) {
										data.score +=5;
										data.lastAttemptTime = Date.now();
										data.level ++;
										if(badgesCouldBeWon&&badgeWon){
											data.badges.push({
												name : 'FastestFingers',
												level : req.session.level,
												timeOfAssignment : Date.now()
											});
										}
										if(badgesCouldBeWon){
											data.badges.push({
													name : 'MileStone',
													level : req.session.level,
													timeOfAssignment : Date.now()
												});
										}

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
										// question.findOne()
									 //     .sort({level : -1})
									 //     .exec(function(err , result) {
									 //     	if(err)
									 //     		console.log(err);
									 //     	else
									 //     	{
									 //     		console.log({maxLevel : result.level});
									 //     		if(data.level > result.level)
										// 			return res.send({valid: 1, redirect:'/winner'});
										// 		else
										// 			return res.send({valid: 1, redirect:'/'});
									 //     	}
									 //     });
									});
								}
							})
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