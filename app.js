var express = require('express');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 5000;

app.listen(function(port){
  console.log(`Server statrted on ort ${port}`)
});
