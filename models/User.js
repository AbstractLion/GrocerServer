const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  activatedQRCode: {
    ref: 'GroceryList',
    type: Schema.Types.ObjectId,
    default: null
  },
  email: String,
  phoneNumber: String,
  firstName: String,
  lastName: String,
  timeoutStart: Date,
  radarId: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;