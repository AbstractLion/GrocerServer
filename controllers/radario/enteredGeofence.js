const User = require('../../models/User');
const {Expo} = require('expo-server-sdk');
const to = require('await-to-js').default;
let expo = new Expo();

module.exports = async (req, res) => {
  const [findErr, findRes] = await to(User.find({radarId: req.body.user._id}).exec());
  if (findErr) return res.status(400).json(findErr);

  for (let user of findRes) {
    let pushToken = user.pushToken;
    if (!pushToken) continue;
    if (!Expo.isExpoPushToken(pushToken)) {
      console.log(`Push token ${pushToken} is not a valid Expo push token`);
      return res.status(400).json({message: 'Invalid push token.'});
    }

    let messages = [];

    messages.push({
      to: pushToken,
      title: "This Store Supports Grocer!",
      sound: 'default',
      priority: 'high',
      channelId: 'notifications',
      body: "Collect somebody's groceries to gain Grocer points which you can redeem for discounts!",
    });

    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    }
  }

  res.json({message: 'works'});
};