const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: Number,
  price: Number,
  imageUrl: String,
  storeId: {
    type: Number,
    required: true
  },
  link: String,
});

const GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;