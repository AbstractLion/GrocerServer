const User = require('../../models/User');
const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;

module.exports = async(req, res) => {
    const { userId, qrCode } = req.body;
    const [findErr, groceryObject] = await to(GroceryList.findOne({qrCode}).exec());
    if (findErr) return res.status(400).json(findErr);
    let activated = groceryObject.activated;
    if (activated) {
        return res.json({ message: "Already Accepted" });
    }
    groceryObject.activated = true;
    const [updateErr] = await to(User.findOneAndUpdate({ _id: userId }, { activatedGroceryList: groceryObject._id }).exec());
    if (updateErr) return res.status(400).json(updateErr);
    groceryObject.shopper = userId;
    await groceryObject.save();
    return res.json({ message: "Accepted" });
};
