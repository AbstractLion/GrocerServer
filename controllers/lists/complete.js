const Store = require('../../models/Store');
const GroceryList = require('../../models/GroceryList');
const {Expo} = require('expo-server-sdk');
const to = require('await-to-js').default;
let expo = new Expo();

module.exports = async(req, res) => {
  const {qrCode} = req.body;
  console.log(qrCode);
  const [groceryListError, groceryList] = await to(GroceryList.findById(qrCode).populate('user').exec());
  if (groceryListError) return res.status(400).json(groceryListError);

  let user = groceryList.user;
  let [storeError, store] = await to(Store.findOne({id: groceryList.storeId}).exec());
  if (storeError) return res.status(400).json(storeError);

  let messages = [];
  messages.push({
    to: user.pushToken,
    title: "Someone Has Finished Your Order!",
    sound: 'default',
    priority: 'high',
    channelId: 'notifications',
    body: "Come retrieve your food at " + store.name,
  });

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
  }

  return res.json({success: true});
};
