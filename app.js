var express = require('express');
var flash = require('express-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var strategies = require('./config/passport');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var app = express();
var login_register = require('./routes/login_register');
var createVote = require('./routes/createVote');
var getpoll = require('./routes/getpoll');
var vote = require('./routes/vote');
var answers = require('./routes/answers');
var questions = require('./routes/question');
//mongoose createConnection
var config = require('./config/main');
var dbAddress = config.mongoDB;
mongoose.connect(dbAddress);
mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'voting-client/build')));

app.use(passport.initialize());

app.use('/',login_register);
app.use('/users', users);
app.use('/api',api);
app.use('/api',createVote);
app.use('/poll/api', vote);
app.use('/api',answers);
app.use('/api',questions);
app.use('/poll/api',getpoll);
app.use('/dashboard/poll/api',getpoll);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//passport config

passport.use('local', strategies.local);
passport.use(strategies.Jwt);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
