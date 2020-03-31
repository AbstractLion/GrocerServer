const GroceryItem = require('../../models/GroceryItem');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const [createErr, createRes] = await to(GroceryItem.create(req.body));
  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};