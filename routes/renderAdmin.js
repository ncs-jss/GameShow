var express = require('express');
var router = express.Router();


router.get('/admin', function(req, res) { 

	if(req.session.email && req.session.level)
		return res.redirect('/');
	res.sendFile('/views/backoffice/pages/login.html',{root : '.'});

});
module.exports = router;