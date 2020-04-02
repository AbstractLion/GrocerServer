const User = require('../../models/User');
const User = require('../../models/GroceryList');
const { Expo } = require('expo-server-sdk');
const to = require('await-to-js').default;
let expo = new Expo();

module.exports = async(req, res) => {
    const [findErr, findRes] = await to(GroceryList.findOne({ qrCode: req.params.id }).populate('user').populate('store').exec());
    if (findErr) return res.status(400).json(findErr)
    let user = findRes.user;
    let store = findRes.store;
    let pushToken = user.pushToken;


    let messages = []

    messages.push({
        to: pushToken,
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

    return res.json({ longitude: store.coords.longitude, latitude: store.coords.latitude });

};
