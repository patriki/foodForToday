var express = require('express');
var router  = express.Router();
var auth    = require('../helpers/auth');

router.get('/profile', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('user/profile', { user: req.user });
});
router.get('/update', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('user/update', { user: req.user });
});

router.post("/update", (req, res, next) => {
  req.session.passport.user.username = req.body.username;
  req.session.passport.user.password = req.body.password;
  req.session.passport.user.age = req.body.age;
  req.session.passport.user.weight = req.body.weight;
  req.session.passport.user.allergies = req.body.eachAllergy;
  req.session.passport.user.kindOfDiet = req.body.eachDiet;

  const updates={
    username : req.body.username,
    age : req.body.age,
    weight :req.body.weight,
    allergies :req.body.eachAllergy,
    kindOfDiet:req.body.eachDiet

  };

  User.findByIdAndUpdate(req.user._id, updates, (err, user) => {
    if (err){ return next(err); }
    console.log(req.session.passport);
       return res.redirect('/profile');
     });

});

module.exports = router;