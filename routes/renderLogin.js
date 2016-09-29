var express = require('express');
var router = express.Router();


router.get('/login', function(req, res) { 
	res.sendFile('/views/front/login.html',{root : '.'});

});
module.exports = router;