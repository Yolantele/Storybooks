var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose = require('mongoose');
var keys = require('./keys');

// load user model
var User = mongoose.model('users');

module.exports = function (passport){
  passport.use(new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    function(accessToken, refreshToken, profile, done){
      // console.log(accessToken);
      // console.log(profile);
      var image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      console.log(image);

      var newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        gender: profile.gender,
        image: image
      };

      // check for existing users
      User.findOne({
        googleID: profile.id }).then( function(user) {
        if(user){   // if user exists, Return user
          done(null, user);
        } else { // Create user
          new User(newUser).save().then( function(user){
          done(null, user);
        });
        }
      });
    })
  );
};
