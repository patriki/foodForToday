const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const Recipe     = require("../models/recipe");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;


var auth    = require('../helpers/auth');


router.post('/classic/favourite', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  const myRecipe= Recipe({
    name: req.body.recipeName,
    image: req.body.recipeImage,
    link: req.body.recipeLink,
    ingredients: req.body.recipeIngredients,
    rating: req.body.recipeRating
  });

  
  Recipe.findOne({ name: req.body.recipeName }, "name", (err, recipe) => {
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
 
   const username= req.session.passport.user.username;
   User.findOne({ username }, (err, user) => {
       if(err) { res.send({ error: 'Something failed!' });}
       user.favourites.push(myRecipe);
       user.save( (err) => { 
           if (err) {return res.send({ error: 'Something failed!' })};
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
            console.log('My favourite is %s', user.favourites);
            res.render("user/favourites", {favourites: user.favourites})

        });
      
});


module.exports = router;
