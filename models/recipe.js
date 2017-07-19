const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const recipeSchema = new Schema({
  	recipeImage: String,
    recipeName: String,
    recipeIngredients: Array,
    recipeRating: Number,
    recipeLink: String
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
