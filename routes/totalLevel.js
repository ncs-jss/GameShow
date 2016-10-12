var express = require('express');
var router = express.Router();
var question = require('../Models/question')

router.get('/totalLevel', function(req, res) { 
     question.findOne()
     .sort({level : -1})
     .exec(function(err , result) { 
     	if(err)
     		res.send(err);
     	else
     		res.send({maxLevel : result.level});
     });
 

});


module.exports = router;