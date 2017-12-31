var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// ---- MIDDLEWARE setup ----

// Load User model
require('./models/User');

// Passport config:
require('./config/passport')(passport);

// Load routes
var auth = require('./routes/auth');

// Load keys

var keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connected
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
})
  .then(function() { console.log('MongoDB Connected') })
  .catch(function(err) { console.log(err) });

var app = express();

app.get('/', function(req, res){
  res.send('it Works');
});


// Cookie-parses arn express-session middleware
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware:
app.use(passport.initialize());
app.use(passport.session());

// set global vars 
app.use(function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Use routes (all middleware above)
app.use('/auth', auth);

var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log(`Server statrted on port ${port}`)
});

module.exports = app;
