/* jshint esversion: 6 */

const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;

var auth    = require('../helpers/auth');

router.get('/profile', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('user/profile', { user: req.session.passport.user });
});
router.get('/update', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('user/update', { user: req.session.passport.user , scripts: ['functions.js','classic.js']});
});

router.post("/update", (req, res, next) => {


  const updates={
    username : req.body.username,
    age : req.body.age,
    weight :req.body.weight,
    allergies :req.body.eachallergy,
    kindOfDiet:req.body.eachdiet

  };

  User.findByIdAndUpdate(req.user._id, updates, {new: true}, (err, user) => {
    if (err){ return next(err); }

    req.session.passport.user = user;
    console.log(req.session.passport);
       return res.redirect('/profile');
     });

});

module.exports = router;
