var express = require("express");
var router = express.Router();


router.post('/makeChoice', function (req,res) {
	// body...
	if(req.session.email) {
		req.session.choice = 1;
		res.send({valid :1 , redirect : '/'});
	}
});
module.exports = router;