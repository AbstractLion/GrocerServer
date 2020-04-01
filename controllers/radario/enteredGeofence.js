const User = require('../../models/User');
const {Expo} = require('expo-server-sdk');
const to = require('await-to-js').default;
let expo = new Expo();

module.exports = async (req, res) => {
  const [findErr, findRes] = await to(User.findOne({radarId: req.body.user._id}).exec());
  if (findErr) return res.status(400).json(findErr);

  let messages = [];
  const pushToken = findRes.pushToken;
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return res.status(400).json({message: 'Invalid push token.'});
  }

  messages.push({
    to: pushToken,
    title: "Store Support for Grocer!",
    sound: 'default',
    priority: 'high',
    channelId: 'notifications',
    body: "This store supports Grocer! Collect somebody's groceries to gain Grocer points which you can redeem for discounts!",
  });

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    console.log(ticketChunk);
  }

  res.json({message: 'works'});
};