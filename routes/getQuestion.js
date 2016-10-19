var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');
var questionAssigned = require('../Models/questionAssigned.js');
var question = require ('../Models/question.js');


router.get('/getQuestion', function(req,res){
	if(!req.session.email ||  req.session.email == '') 
		 return res.redirect('/login');

		// All the code for gettimg question.
		User.findOne({email_ID : req.session.email},function(err, userData) {
			if(err){
				console.log(err);
				return  res.send({valid : 0, redirect : '/'});
			}

			if(!userData){
				req.session.email = null 
				return res.send({valid:0,redirect : '/'})
			}

		questionAssigned.findOne({'user_ID' : req.session.email , 'level' : req.session.level }).populate('question_ID')
		.exec(function(err,result) {
				console.log(result);
				if(result) {
					if(userData.level != req.session.level) {
						req.session.level = userData.level;
						return res.send({valid:0,redirect : '/'})
					}
					//populate question details then send
					res.send({valid :1, "question" :result.question_ID.question});
				}
				else
					assignQuestion(req, res);
			});
	
		})

});



var assignQuestion = function(req, res ) { 
	console.log("Assigning question for: level : " + req.session.level);
	
	question.find({'level' : req.session.level}).exec(function(err, result) {
		console.log("the length of result is " + result.length);
		if(result.length == 0)
			return res.send({valid : 0, redirect : '/winner'});

		if(result.length == 1) {
			req.session.choice = null;

			User.findOne({'email_ID' : req.session.email}, function(err, user){

				if(err)
					return console.log(err);
				if (user) {
					var newQuestionToBeAssigned = new questionAssigned({
						'user_ID' : user.email_ID,
						'question_ID'  : result[0]._id,
						//'timeOfAssignment' : { type : Date, default : Date.now },
						//'timeOfCompletion' : { type : Date },
						//'duration' : Number,
						'level' : req.session.level
					});
					newQuestionToBeAssigned.save(function(Err) {
						if(err)
							console.log(err)
						else {
							console.log("successfully default question assigned  with data \n");
							res.send({valid : 0 , redirect : '/'});
						}

					});

				}
				else 
					res.send("Invalid session");
			})
		}
		if (result.length>1) {
			if(!req.session.choice || req.session.choice == null) {
				console.log('sending 3 doors page');
				//res.sendFile('')
				res.send({valid : 0, redirect: '/makeChoice'});

			}

			else if (req.session.choice) {
   
				var temp = result[(Math.floor((Math.random() * 1000) + 1))%result.length];

				User.findOne({'email_ID' : req.session.email}, function(err, user){
				if(err)
					return console.log(err);
				if (user) {
					var newQuestionToBeAssigned = new questionAssigned({
						'user_ID' : user.email_ID,
						'question_ID'  : temp._id,
						//'timeOfAssignment' : { type : Date, default : Date.now },
						//'timeOfCompletion' : { type : Date },
						//'duration' : Number,
						'level' : req.session.level
					});
					newQuestionToBeAssigned.save(function(Err) {
						if(Err)
							console.log(Err)
						else {
							console.log("Question with choice assigned");
							req.session.choice = null;
							res.send({valid : 0,redirect:'/'});

						}

					});

				}
				else 
					res.send("Invalid session");
			})
			}

		}
	}); 
}


module.exports = router;

