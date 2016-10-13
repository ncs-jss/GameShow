var express = require('express');
var router = express.Router();


router.get('/winner', function(req, res) { 
	console.log('req recieved with req.session.email value' + req.session.email);
  if(req.session.email)
		return res.sendFile('/views/front/winner.html',{root : '.'});
});
module.exports = router;