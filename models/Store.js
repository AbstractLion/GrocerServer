const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  coords: {
    latitude: Number,
    longitude: Number
  },
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;