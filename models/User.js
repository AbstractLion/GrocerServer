const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  activatedGroceryList: {
    ref: 'GroceryList',
    type: Schema.Types.ObjectId,
    default: null
  },
  email: String,
  role: String,
  phoneNumber: String,
  firstName: String,
  lastName: String,
  timeoutStart: Date,
  radarId: String,
  pushToken: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;