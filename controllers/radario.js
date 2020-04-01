const User = require('../models/User');
const {Expo} = require('expo-server-sdk');
const to = require('await-to-js').default;
let expo = new Expo();

module.exports = async (req, res) => {
  const [findErr, findRes] = await to(User.find({radarId: req.body.user._id}).exec());
  if (findErr) return res.status(400).json(findErr);
  let messages = [];
  for (let pushToken of findRes.pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      body: "This store supports Grocer! Collect somebody's groceries to gain Grocer points which you can redeem for discounts!",
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    console.log(ticketChunk);
  }

  console.log(JSON.stringify(req.body));
  res.json({message: 'works'});
};