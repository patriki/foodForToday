const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/templateExpress');

const Question = require('../models/question');

const questions = [
  {
    title:  'Who is your favourite Spice Girl?',
    type: "Flavor",
    options: [
                { answer: "Sporty Spice", translate: "allowedIngredient[]=lemon&" },
                { answer: "Posh Spice",   translate: "allowedIngredient[]=onion&" },
                { answer: "Scary Spice",  translate: "allowedIngredient[]=paprika&" },
                { answer: "Baby Spice",   translate: "allowedIngredient[]=carrot&" },
                { answer: "Ginger Spice", translate: "allowedIngredient[]=potato&" }
            ]
	},
    {
    title:  'Whom would you kill in Game of Thrones?',
    type: "Flavor",
    options: [
                { answer: "Daenerys", translate: "allowedIngredient[]=lemon&" },
                { answer: "Tyrion",   translate: "allowedIngredient[]=onion&" },
                { answer: "Jon Snow", translate: "allowedIngredient[]=paprika&" },
                { answer: "Aria",     translate: "allowedIngredient[]=carrot&" },
                { answer: "Jamie",    translate: "allowedIngredient[]=potato&" }
            ]
	},
    {
    title:  'You have to steal the dog of an sweet old woman in the street. From the following tools, which one would you choose',
    type: "Time",
    options: [
                { answer: "sausage", translate: "maxTotalTimeInSeconds=900&" },
                { answer: "plastic bag", translate: "maxTotalTimeInSeconds=3600&" },
                { answer: "wine bottle", translate: "maxTotalTimeInSeconds=5400&" }
            ]
	},
    {
    title:  'Would you kill a butterfly with a canddle for 5€?',
    type: "Time",
    options: [
                { answer: "No way!! Too much effort for a bug ", translate: "maxTotalTimeInSeconds=900&" },
                { answer: "Yes! Where is it?", translate: "maxTotalTimeInSeconds=5400&" }
            ]
	},
    {
    title:  'What would you prefer to eat?',
    type: "Cuisine",
    options: [
                { answer: "a cactus", translate: "allowedCuisine[]=cuisine^cuisine-moroccan&" },
                { answer: "an alive cockroach", translate: "allowedCuisine[]=cuisine^cuisine-mexican&" },
                { answer: "the moustache of a shrimp", translate: "allowedCuisine[]=cuisine^cuisine-spanish&" }
            ]
	},
    {
    title:  'If you had to make bread at home, by yourself, what would you do?',
    type: "Cuisine",
    options: [
                { answer: "Call my granny immediately", translate: "allowedCuisine[]=cuisine^cuisine-spanish&" },
                { answer: "Google it, of course", translate: "allowedCuisine[]=cuisine^cuisine-american&" },
                { answer: "I'd try by myself, the sky is the limit", translate: "allowedCuisine[]=cuisine^cuisine-chinese&" }
            ]
	},
    {
    title:  'Are you someone whom does not admit to peeing in the shower despite doing it?',
    type: "Ingredient",
    options: [
                { answer: "Eeeeh... mmm.... yes, ok, I am...", translate: "allowedIngredient[]=garlic&" },
                { answer: "No, I never lie about bathroom stuff", translate: "allowedIngredient[]=avocado&" }
            ]
	},
    {
    title:  'How continue these serie of numbers: 5, 10, 15, 20, 25, 5, 40...',
    type: "Ingredient",
   options: [
                { answer: "55", translate: "allowedIngredient[]=tomato&" },
                { answer: "10", translate: "allowedIngredient[]=rice&" },
                { answer: "80", translate: "allowedIngredient[]=avocado&" }
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
