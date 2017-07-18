/* jshint esversion: 6 */

const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error") });
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var age = req.body.age;
  var weight = req.body.weight;
  var allergies = req.body.eachAllergy;
  console.log(allergies);
  var kindOfDiet = req.body.eachDiet;

  if (username === "" || password === "" || age === "" || weight === "") {
  	req.flash('error', 'Fill all the text boxes, please' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The username already exists' );
      res.render("auth/signup", { message: req.flash("error") });
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
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/search');
        });
      }
    });
  });
});

////////////////////////

router.post("/update", (req, res, next) => {
  req.session.passport.user.username = req.body.username;
  req.session.passport.user.password = req.body.password;
  req.session.passport.user.age = req.body.age;
  req.session.passport.user.weight = req.body.weight;
  req.session.passport.user.allergies = req.body.eachAllergy;
  req.session.passport.user.kindOfDiet = req.body.eachDiet;
  console.log(req.user._id);

  // if (username === "" || password === "" || age === "" || weight === "") {
  // 	req.flash('error', 'Fill all the text boxes, please' );
  //   res.render("update", { "message": req.flash("error") });
  //   return;
  // }

  const updates={
    username : req.body.username,
    age : req.body.age,
    weight :req.body.weight,
    allergies :req.body.eachAllergy,
    kindOfDiet:req.body.eachDiet

  };
  console.log(updates);


  User.findByIdAndUpdate(req.user._id, updates, (err, user) => {
    if (err){ return next(err); }
    console.log(req.session.passport);
       return res.redirect('/profile');
     });



    // var salt     = bcrypt.genSaltSync(bcryptSalt);
    // var hashPass = bcrypt.hashSync(password, salt);

    // newUser.save((err) => {
    //   if (err) {
    //   	req.flash('error', 'The username already exists' );
    //     res.render("auth/signup", { message: req.flash('error') });
    //   } else {
    //     passport.authenticate("local")(req, res, function () {
    //        res.redirect('/search');
    //     });
    //   }
    // });
//  });
});

///////////////



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
