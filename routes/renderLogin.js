var express = require('express');
var router = express.Router();


router.get('/login', function(req, res) { 
	console.log('req recieved with req.session.email value' + req.session.email);
	if(req.session.email && req.session.level)
		return res.redirect('/');
	res.sendFile('/views/front/login.html',{root : '.'});

});
module.exports = router;