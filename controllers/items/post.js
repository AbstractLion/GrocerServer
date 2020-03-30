const GroceryItem = require('../../models/GroceryItem');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {name, rating, price, imageUrl, link} = req.body;
  const [createErr, createRes] = await to(GroceryItem.create({
    name, rating, price, imageUrl, link
  }));
  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};