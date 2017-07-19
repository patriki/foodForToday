const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  	username: String,
  	password: String,
    age: Number,
    weight: Number,
    allergies: Array,
    kindOfDiet: Array,
	  favorites: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
