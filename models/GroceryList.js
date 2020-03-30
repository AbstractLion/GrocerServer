const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryListSchema = new Schema({
  qrCode: String,
  author: String,
  storeId: Number,
  createdAt: Date,
  items: [Schema.Types.ObjectId]
});

const GroceryList = mongoose.model('GroceryList', GroceryListSchema);

module.exports = GroceryList;