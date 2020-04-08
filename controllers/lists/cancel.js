const User = require('../../models/User');
const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;
const {Expo} = require('expo-server-sdk');
let expo = new Expo();

module.exports = async(req, res) => {
  const {listId} = req.body;
  const [groceryListError, groceryList] = await to(GroceryList.findByIdAndUpdate(listId,
    {activated: false}, {new: true}).exec());
  if (groceryListError) return res.status(400).json(groceryListError);
  const [userError] = await to(User.findByIdAndUpdate(groceryList.shopper, {activatedGroceryList: null}).exec())
  if (userError) return res.status(400).json(userError);
  res.json({success: true});
};
