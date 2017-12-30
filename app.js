var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');


// ---- MIDDLEWARE setup ----

// Passport config:
require('./config/passport')(passport);


// Load routes
var auth = require('./routes/auth');


var app = express();

app.get('/', function(req, res){
  res.send('it Works');
});

// Use routes
app.use('/auth', auth);


var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log(`Server statrted on port ${port}`)
});

module.exports = app;
