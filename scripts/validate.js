// FOR REGISTER ROUTE

// checks email format
module.exports.checkEmail = function(email) {
  var regexE = /\S+@\S+\.\S+/ ;
  if(email.match(regexE)) {
    res.send("valid email!");
  } else {
    res.send("invalid!");
  }
};

// checks phone number format
module.exports.checkPhone = function(phone) {
  var regexP = /\d{10}/ ;
  if(phone.match(regexP)) {
    res.send("valid contact number!");
  } else {
    res.send("invalid!");
  }
};

// check nullinput
module.exports.checkEmptyInput = function(input) {
  var regexBlank = /^\s*$/;
  if( input.match(regexBlank) || input.length === 0) {
    res.send("blank field");
  } else {
    res.send("success!");
  }
};


// FOR LOGIN ROUTE

// checks
module.exports.checkEmailOrNumber = function (emailOrNumber) {
    var regexEorP = /\d{10}|\S+@\S+\.\S+/ ;
    if(emailOrNumber.match(regexEorP)) {
      res.send("valid format!");
    } else {
      res.send("invalid!");
    }
  };
