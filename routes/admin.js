var express = require('express');
var router = express.Router();


router.get('/admin', function(req, res) { 
	console.log('req recieved for admin');
	if(req.session.id == 'admin')
	res.sendFile('/views/front/index.html',{root : '.'});
	else
		res.redirect('/adminLogin');
});
module.exports = router;