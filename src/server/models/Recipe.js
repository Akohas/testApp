const mongoose = require('../mongoose');

const {
  Schema,
} = mongoose;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Recipe', RecipeSchema);
