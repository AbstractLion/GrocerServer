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
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
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
    id: {
      type: [Schema.Types.ObjectId],
      ref: 'GroceryItem'
    },
    count: Number
  }],
});

const GroceryList = mongoose.model('GroceryList', GroceryListSchema);

module.exports = GroceryList;