const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryListSchema = new Schema({
  qrCode: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  storeId: Number,
  createdAt: Date,
  activated: {
    type: Boolean,
    default: false
  },
  shopper: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'GroceryItem'
    },
    count: Number
  }],
});

const GroceryList = mongoose.model('GroceryList', GroceryListSchema);

module.exports = GroceryList;