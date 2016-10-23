var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var MongoStore = require('connect-mongo/es5')(session);


var app = express();

var Question = require('./Models/question.js');
var QuestionAssigned = require('./Models/questionAssigned.js');
var Reference = require('./Models/reference.js');
var User = require('./Models/userInfo.js');


var uristring = 'mongodb://localhost/first';
var mongoOptions = { db: { safe: true } };

// Connect to Database
// mongoose.connect(uristring, mongoOptions, function(err, res) {
//     if (err) {
//         console.log('ERROR connecting to: remote' + uristring + '. ' + err);
//     } else {
//         console.log('Successfully connected to: remote' + uristring);
//     }
// });

// Requiring Routes
var renderLogin = require('./routes/renderLogin');
var register = require('./routes/register');
var login = require('./routes/login');
var index = require('./routes/index');
var rules = require('./routes/rules');
//var users = require('./routes/users');
var user = require("./routes/user");
var totalLevel = require("./routes/totalLevel");
var getQuestion = require('./routes/getQuestion');
var checkAnswer = require('./routes/checkAnswer');
var renderMakeChoice = require('./routes/renderMakeChoice');
var makeChoice = require('./routes/makeChoice');
var leaderBoard = require('./routes/leaderBoard')
var renderLeaderBoard = require('./routes/renderLeaderBoard');
var renderWinner = require('./routes/renderWinner');
var renderEnding = require('./routes/renderEnding');

//for backOffice use routes

var renderAdminLogin = require('./routes/renderAdminLogin');
var adminLogin = require('./routes/adminLogin');
var renderAdmin = require('./routes/admin');
var getAllQuestion = require('./routes/getAllQuestion');
var renderAddQuestion = require('./routes/renderAddQuestion');
var addQuestion = require('./routes/addQuestion');
var renderRemoveQuestion = require('./routes/renderRemoveQuestion');
var removeQuestion = require('./routes/removeQuestion');
var removeUser = require('./routes/removeUser');
var renderGenerateReference = require('./routes/renderGenerateReference');
var generateMultipleReference = require('./routes/generateMultipleReference')
var userAdmin = require('./routes/userAdmin');
var referenceAdmin = require('./routes/referenceAdmin');
var studentProfile = require('./routes/studentProfile');

var logout = require('./routes/logout');
//var renderHomePage = require ('./routes/renderHomePage')


// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(session({
    secret: '57eac3e1d6a4cc1134578440',
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection
    //})
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));



// app.use('/users', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//  Registers the User and redirect you to login page.


// // This will generate a referance number and returns it .
// app.post('/generateReference', function(req, res) {
//     if (req.session.admin && req.session.admin == "admin") {
//         var newReference = new Reference({
//             state: true,
//             email_ID: req.body.email_ID
//         });

//         newReference.referenceNumber = newReference._id //crypto.createHash('md5').update(req.body.email_ID).digest('hex')

//         newReference.save(function(err) {
//             if (!err) {
//                 res.send({ id: newReference.referenceNumber });
//             } else {
//                 console.log(err);
//                 res.send("try new email_ID")
//             }

//         });
//     } else
//         res.send({valid:0, redirect:"/admin"});
// });



//console.log("following action needs to be done \n1 uncomment below routes \n 2 delete redirect code from '/' route \n3 remove comment from login signup modal");
app.get('/login', renderLogin);

app.post('/register', register);

app.post('/login', login);

app.get('/', index);

app.get('/rules', rules);

app.get('/user', user);

app.get('/totalLevel', totalLevel);

// app.get('/getQuestion', getQuestion);

// app.post('/checkAnswer', checkAnswer);

// app.get('/makeChoice', renderMakeChoice);

// app.post("/makeChoice", makeChoice);

app.get('/Leader', renderLeaderBoard);

app.get('/winner', renderWinner);

app.get('/leaderBoard', leaderBoard);

//Change this for final winners 

app.get('/finish', renderEnding);


//-------------------------------------
//admin apis


app.get('/adminLogin', renderAdminLogin); //to get Login page

app.post('/adminLogin', adminLogin); //to post credentials of admin

app.get('/admin', renderAdmin);

app.get('/generateReference', renderGenerateReference)

app.get('/addQuestion', renderAddQuestion);

app.post('/addQuestion', addQuestion);

app.get('/getAllQuestion', getAllQuestion);

app.get('/removeQuestion', renderRemoveQuestion);

app.post('/removeQuestion', removeQuestion);

app.post('/generateMultipleReference', generateMultipleReference);


app.post('/removeUser', removeUser)

app.get('/userAdmin', userAdmin);

app.get('/referenceAdmin', referenceAdmin);


app.get('/studentProfile',studentProfile);

app.get('/logout', logout)


app.listen(process.env.PORT||8895, function() {
    console.log("server listening at port 8895");
});

module.exports = app;
