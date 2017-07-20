const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/templateExpress');

const Question = require('../models/question');

const questions = [
  {
    title:  'Who is your favourite Spice Girl?',
    type: "Flavor",
    options: [
                { answer: "Sporty Spice", translate: "flavor.salty.max=0.2&" },
                { answer: "Posh Spice",   translate: "flavor.bitter.max=1&" },
                { answer: "Scary Spice",  translate: "flavor.salty.max=1&" },
                { answer: "Baby Spice",   translate: "flavor.sweet.max=1&" },
                { answer: "Ginger Spice", translate: "flavor.piquant.max=1&" }
            ]
	},
    {
    title:  'Whom would you kill in Game of Thrones?',
    type: "Flavor",
    options: [
                { answer: "Daenerys", translate: "flavor.piquant.max=0&" },
                { answer: "Tyrion",   translate: "flavor.bitter.max=1&" },
                { answer: "Jon Snow", translate: "flavor.sweet.max=0&" },
                { answer: "Aria",     translate: "flavor.sour.max=1&" },
                { answer: "Jamie",    translate: "flavor.salty.max=0&" }
            ]
	},
    {
    title:  'Time1',
    type: "Time",
    options: [
                { answer: "answer1", translate: "maxTotalTimeInSeconds=5400&" },
                { answer: "answer2", translate: "maxTotalTimeInSeconds=3600&" }
            ]
	},
    {
    title:  'Time2',
    type: "Time",
    options: [
                { answer: "answer1", translate: "maxTotalTimeInSeconds=900&" },
                { answer: "answer2", translate: "maxTotalTimeInSeconds=7200&" }
            ]
	},
    {
    title:  'Cuisine1',
    type: "Cuisine",
    options: [
                { answer: "answer1", translate: "allowedCuisine[]=cuisine^cuisine-american&" },
                { answer: "answer2", translate: "allowedCuisine[]=cuisine^cuisine-mexican&" }
            ]
	},
    {
    title:  'Cuisine2',
    type: "Cuisine",
    options: [
                { answer: "answer1", translate: "allowedCuisine[]=cuisine^cuisine-indian&" },
                { answer: "answer2", translate: "allowedCuisine[]=cuisine^cuisine-french&" }
            ]
	},
    {
    title:  'Ingredient1',
    type: "Ingredient",
    options: [
                { answer: "answer1", translate: "allowedIngredient[]=garlic&" },
                { answer: "answer2", translate: "allowedIngredient[]=onion&" }
            ]
	},
    {
    title:  'Ingredient2',
    type: "Ingredient",
   options: [
                { answer: "answer1", translate: "allowedIngredient[]=avocado&" },
                { answer: "answer2", translate: "allowedIngredient[]=cucumber&" }
            ]
	}

];

Question.create(questions, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((question) => {
    console.log(question.title)
  });
  mongoose.connection.close();
});