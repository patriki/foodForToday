/* jshint esversion: 6 */

const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error"), scripts: ["functions.js","form-user.js" ] });
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var age = req.body.age;
  var weight = req.body.weight;
  var allergies = req.body.eachallergy;
  var kindOfDiet = req.body.eachdiet;

  if (username === "" || password === "" || age === "" || weight === "") {
  	req.flash('error', 'Fill all the text boxes, please' );
    res.render("auth/signup", { "message": req.flash("error"), scripts: ["functions.js","form-user.js" ] });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The username already exists' );
      res.render("auth/signup", { message: req.flash("error") , scripts: ["functions.js","form-user.js" ]});
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass,
      age,
      weight,
      allergies,
      kindOfDiet
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The username already exists' );
        res.render("auth/signup", { message: req.flash('error') , scripts: ["functions.js","form-user.js" ]});
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/search');
        });
      }
    });
  });
});



router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/search",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/logout", (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  // delete currentUser and passport properties
  // becasuse when we calling req.logout() is leaving an empty object inside both properties.
  res.redirect('/');


});

router.get("/auth/facebook",          passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/search",
  failureRedirect: "/"
}));

module.exports = router;
