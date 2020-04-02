const GroceryList = require('../../models/GroceryList');
const GroceryItem = require('../../models/GroceryItem');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {author, qrCode, items, createdAt} = req.body;
  let itemsArr = [];
  for (let [key, item] of Object.entries(items)){
    itemsArr.push(key);
  }
  console.log(itemsArr);
  const [createErr, createRes] = await to(GroceryList.create({
    author, qrCode, items: itemsArr, createdAt
  }));
  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};
