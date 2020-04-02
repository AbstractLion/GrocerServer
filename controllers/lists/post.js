const GroceryList = require('../../models/GroceryList');
const GroceryItem = require('../../models/GroceryItem');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {author, qrCode, items, createdAt} = req.body;
  let itemsArr = [];
  for (let [key, item] of Object.entries(items)){
    const {title, price, imageUrl, rating} = item;
    const [itemErr, itemRes] = await to(GroceryItem.create({
      title, price, imageUrl, rating
    }).exec());
    if (itemErr) return res.status(400).json(itemErr);
    itemsArr.push(itemRes._id);
  }
  console.log(itemsArr);
  const [createErr, createRes] = await to(GroceryList.create({
    author, qrCode, itemsArr, createdAt
  }));
  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};
