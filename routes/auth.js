var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google', passport.authenticate('google',
{ scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/verify', function(req, res){
  if(req.user){
    console.log(req.user);
  } else {
    console.log('Not Auth');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');

});

module.exports = router;
