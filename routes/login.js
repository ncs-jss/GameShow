var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');


/* GET users listing. */
router.post('/login', function(req, res, next) {


    var emailOrNumber = req.body.emailOrNumber;
    var password = req.body.password;
    //console.log(password + emailOrNumber);
    User.findOne({
        $or: [{ 'email_ID': emailOrNumber },
            { 'mobileNumber': emailOrNumber }
        ]
    }, function(err, result) {
        if (err)
            return console.log(err);

        if (result)
           {
            if (result.password == password) {
                req.session.email = result.email_ID;
                req.session.level = result.level;

                return res.send({ 'valid': 1, 'redirect': '/' });
            }
            else
              return res.send({valid : 0, comment : "*Incorrect password", type:"pass"});
          }
        res.send({valid : 0, comment : "*Incorrect Email or Number", type:"login"});
    });

});



module.exports = router;
