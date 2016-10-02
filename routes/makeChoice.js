var express = require("express");
var router = express.Router();


router.post('/makeChoice', function (req,res) {
	// body...
	if(req.session.email) {
		req.session.choice = req.body.email;
		res.send({valid :1 , redirect : '/getQuestion'});
	}
});
module.exports = router;