var express = require('express');
var router = express.Router();
var question = require('../Models/question');

router.get('/winner', function(req, res) { 
	console.log('req recieved with req.session.email value' + req.session.email);
  if(req.session.email) {
  	console.log("here1");
  	question.findOne()
     .sort({level : -1})
     .exec(function(err , result) { 
     	//console.log("entered here");
     	if(err)
     		res.send(err);
     	else if (result.level+1 == req.session.level) {
     		console.log("result.,level is "+ result.level + " and session.level is "+req.session.level);
			return res.sendFile('/views/front/winner.html',{root : '.'});
     	}
     	else
     		return res.redirect("/"); 
     });
     		


  }
  else
  	return res.redirect("/"); 
});
module.exports = router;