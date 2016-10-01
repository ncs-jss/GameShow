var express = require('express');
var router = express.Router();


router.get('/generateReference', function(req, res) { 

  if(req.session.admin && req.session.admin == 'admin')
     res.sendFile('/views/backoffice/pages/generateReference.html', {root : '.'});
  else
    res.redirect('/adminLogin');

});


module.exports = router;