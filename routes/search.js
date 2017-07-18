/* jshint esversion: 6 */

const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;


var auth    = require('../helpers/auth');



router.get('/search', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
	// console.log(req.user);
  res.render('search/search', { user: req.user });
});

router.get('/surprise', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
	// console.log(req.user);
  res.render('search/surprise', { user: req.user });
});

router.get('/classic', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('search/classic', {user: req.user, scripts: ['functions.js','favourite.js','classic.js']})
});

router.post('/classic/favourite', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  console.log(req);
});

module.exports = router;
