const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryListSchema = new Schema({
  qrCode: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String
  },
  storeId: Number,
  createdAt: Date,
  activated: {
    type: Boolean,
    default: false
  },
  items: [{type: [Schema.Types.ObjectId], ref: 'GroceryItem'}]
});

const GroceryList = mongoose.model('GroceryList', GroceryListSchema);

module.exports = GroceryList;