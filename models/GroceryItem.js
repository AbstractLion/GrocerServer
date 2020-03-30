const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryItemSchema = new Schema({
  name: String,
  rating: Number,
  price: Number,
  imageUrl: String,
  link: String
});

const GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;