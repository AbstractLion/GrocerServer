const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {user, qrCode, items, createdAt} = req.body;
  let itemsArr = [];
  for (let [key, item] of Object.entries(items)) {
    itemsArr.push({item: key, count: item.count});
  }
  const [createErr, createRes] = await to(GroceryList.create({
    user, qrCode, items: itemsArr, createdAt
  }));
  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};
