var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.get('/', function(req, res){
  res.send('it Works');
});

var port = process.env.PORT || 5000

app.listen(port, function(){
  console.log(`Server statrted on port ${port}`)
});

module.exports = app;
