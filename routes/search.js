/* jshint esversion: 6 */

const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const Recipe     = require("../models/recipe");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;


var auth    = require('../helpers/auth');



router.get('/search', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
	// console.log(req.user);
  res.render('search/search', { user: req.user , stylesheets:["index.css"]});
});


router.get('/classic', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('search/classic', {user: req.user, scripts: ['functions.js','favourite.js','classic.js']})
});

router.post('/classic', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  console.log(req.body.recipeId);
  
 Recipe.findOne({ yummlyid:req.body.recipeId }, "yummlyid", (err, recipe) => {
    if(err) {return res.send({ error: 'Something failed!' })}
    
    if (recipe === null) {
      res.status(200).json({ ok: false});
    } else {
       
       User.findOne({ username: req.user.username, favourites: { $in: [recipe._id] }}, (err, user) => {
        if(err) { res.send({ error: 'Something failed!' });}

        if(user) {res.status(200).json({ ok: true});}
        console.log("No es favorito de nadie!!")
       });
    }
  })
});



module.exports = router;
