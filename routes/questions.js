/* jshint esversion: 6 */

const express  = require('express');
const bcrypt   = require("bcrypt");
const User     = require("../models/user");
const Question = require("../models/question");
const passport = require("../helpers/passport");

const router     = express.Router();
const bcryptSalt = 10;

var auth    = require('../helpers/auth');

router.get('/questions', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
    // Get random flavor
    Question.findRandom({type: "Flavor"}).limit(1).exec(function (err, questionsFlavour) {
            if (err) { return res.status(500).json({error: true})};
            

            Question.findRandom({type: "Ingredient"}).limit(1).exec(function (err, questionsIngredients) {
                if (err) { return res.status(500).json({error: true})};
             

                Question.findRandom({type: "Time"}).limit(1).exec(function (err, questionsTime) {
                    if (err) { return res.status(500).json({error: true})};
                   

                    Question.findRandom({type: "Cuisine"}).limit(1).exec(function (err, questionsCuisine) {
                        if (err) { return res.status(500).json({error: true})};
                       
                        const finalQuestions=[questionsFlavour[0], questionsIngredients[0], questionsTime[0], questionsCuisine[0]];

                        res.render('search/questions', { finalQuestions, scripts: ["functions.js","questions.js", "favourite.js"], stylesheets:["questions.css"] });
                        
            
                    }); 
            
                });
            
        }); 
                
    }); 

  
});
                                                                            

module.exports = router;