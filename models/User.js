var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Schema
var UserSchema = new Schema({
  googleID:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type:String,
  },
  lastName: {
    type:String,
  },
  gender: {
    type: String,
  },
  image: {
    type:String,
  }
});

// Create collection and add Schema
mongoose.model('users', UserSchema);
