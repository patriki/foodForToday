const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const Recipe     = require("../models/recipe");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;


var auth    = require('../helpers/auth');


router.post('/save-favourite', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  const myRecipe= Recipe({
    yummlyid:req.body.recipeId,
    name: req.body.recipeName,
    image: req.body.recipeImage,
    link: req.body.recipeLink,
    ingredients: req.body.recipeIngredients,
    rating: req.body.recipeRating
  });
console.log(myRecipe);

  Recipe.findOne({ yummlyid:req.body.recipeId }, "yummlyid", (err, recipe) => {
    if(err) {return res.send({ error: 'Something failed!' })}
    if (recipe === null) {
        myRecipe.save((err) => {
            if (err) {
                return res.send({ error: 'Something failed!' });
            } else {
                console.log("Receta creada");
            }
        });

    }
 });

   User.findOne({ username: req.user.username}, (err, user) => {
       if(err) { res.send({ error: 'Something failed!' });}
       user.favourites.push(myRecipe);
       user.save( (err) => {
           if (err) {return res.send({ error: 'Something failed!' })};
                res.status(200).json({ ok: true});
           })


        });



});

router.post('/delete-favourite', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
    console.log(req.body.recipeId)
  Recipe.findOne({ yummlyid: req.body.recipeId }, "yummlyid", (err, recipe) => {
    if(err) {return res.send({ error: 'Something failed!' })}

    User.findOneAndUpdate({ username:req.user.username }, {$pull: {favourites: recipe._id }}).
        exec((err, user) => {
            if(err) { res.send({ error: 'Something failed!' });}
            res.status(200).json({ ok: true});
           })

    });




});

router.get('/profile/favourites', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
   User.
        findOne({ username:req.session.passport.user.username }).
        populate('favourites').
        exec(function (err, user) {
            if (err) return res.send({ error: 'Something failed!' });
            res.render("user/favourites", {favourites: user.favourites, scripts:["functions.js", "delete.js"]})

        });

});


module.exports = router;
