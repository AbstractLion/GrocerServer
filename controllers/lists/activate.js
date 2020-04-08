const User = require('../../models/User');
const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;
const {Expo} = require('expo-server-sdk');
let expo = new Expo();

module.exports = async(req, res) => {
  console.log('activate.js');
  const { userId, qrCode } = req.body;
  const [groceryListError, groceryList] = await
    to(GroceryList.findOne({qrCode}).exec());
  if (groceryListError || !groceryList) return res.status(400).json(groceryListError);
  let activated = groceryList.activated;
  if (activated) {
    return res.status(300).json({message: "Already Accepted" });
  }
  groceryList.activated = true;
  const [userError, user] = await to(User.findOneAndUpdate(
    {_id: userId}, {activatedGroceryList: groceryList._id}
  ).exec());
  if (userError) return res.status(400).json(userError);
  groceryList.shopper = userId;
  await groceryList.save();

  let pushToken = user.pushToken;
  let messages = [];
  messages.push({
    to: pushToken,
    sound: null,
    priority: 'normal',
    channelId: 'activated',
    data: {isActivation: true, userId},
    ios: {_displayInForeground: false}
  });
  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    console.log(ticketChunk);
  }

  return res.json({ message: "Accepted" });
};
