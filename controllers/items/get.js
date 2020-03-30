const GroceryItem = require('../../models/GroceryItem');
const to = require('await-to-js');

module.exports = async (req, res) => {
  const [findErr, findRes] = await to(GroceryItem.find({
    name: {$regex: req.query.filter || ''}
  }).exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};