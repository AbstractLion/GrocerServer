const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryItemSchema = new Schema({
  title: String,
  rating: Number,
  price: Number,
  imageUrl: String
});

const GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;