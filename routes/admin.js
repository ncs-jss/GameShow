var express = require('express');
var router = express.Router();


router.get('/admin', function(req, res) { 
	console.log('req recieved for admin with sess.admin =' +req.session.admin );
	if(req.session.admin && req.session.admin == 'admin')
	   res.sendFile('/views/backoffice/pages/leaderboard.html',{root : '.'});
	else
		res.redirect('/adminLogin');
});
module.exports = router;