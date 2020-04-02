const User = require('../../models/User');
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
      title: "You have not fulfilled your grocery list for a requestor!",
      sound: 'default',
      priority: 'high',
      channelId: 'notifications',
      body: "Either cancel the grocery list or if completed, get it scanned by an employee.",
    });

    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
    }

    res.json({message: 'works'});
  }
}
