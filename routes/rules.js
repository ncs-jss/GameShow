var express = require('express');
var router = express.Router();


router.get('/rules', function(req, res) { 
     res.sendFile('/views/front/Rules.html', {root : '.'});
 

});


module.exports = router;