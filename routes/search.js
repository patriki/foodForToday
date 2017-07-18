var express = require('express');
var router  = express.Router();
var auth    = require('../helpers/auth');



router.get('/search', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
	// console.log(req.user);
  res.render('search/search', { user: JSON.stringify(req.user) });
});

router.get('/surprise', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
	// console.log(req.user);
  res.render('search/surprise', { user: JSON.stringify(req.user) });
});

router.get('/classic', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('search/classic', {scripts: ['classic.js']})
});

module.exports = router;
