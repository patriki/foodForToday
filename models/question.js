const random = require('mongoose-random');
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const questionSchema = new Schema({
    title: String,
    type: String,
    options: [
                { answer: String, translate: String }
            ]
	}
);

questionSchema.plugin(random, { path: 'r' });

questionSchema.statics.findQuestionRandomByType = (type, cb) => {
    return this.findRandom({type: type}).limit(1).exec(cb);
}

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
