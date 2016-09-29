var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');
var Reference = require('../Models/reference.js')
var ObjectID = require('mongoose').Types.ObjectId;


router.post('/register', function(req, res) {
  var referenceNo = req.body.referenceNo;
  if((referenceNo.length != 24) || (new ObjectID(referenceNo) !=  referenceNo) )
    return res.send("Invalid Reference No");
  Reference.findById(referenceNo).exec(function(err, result){
    console.log(result);
    if(err)
      return console.log(err);
    if(result.state) {
      var email = req.body.email;
      var mobileNumber = req.body.mobileNumber;
      var password = req.body.password;
      var avatar =  req.body.avatar;
      var name = req.body.name;
      var year = req.body.year;
      var newUser = new User({
        'refrenceNumber' : referenceNo,
        'email_ID'  : email,
        'password'  : password,
        'name'  : name,
        'year' : year,
        'mobileNumber' : mobileNumber,
        'avatar' : avatar
      });
      newUser.save(function(err){
        if (err) {
          console.log(err)

         return res.send("try new mobileNumber or email_ID!!");
        }
        result.state = false;
        result.save(function(err){
          if(err)
            console.log(err);
        });
        res.end('Success');
      }); 
    }
    else
    res.send("Reference number " + referenceNo + " is not valid!!");
  })
});

module.exports = router;
