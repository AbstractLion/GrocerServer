const GroceryItem = require('../../models/GroceryItem');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const [findErr, findRes] = await to(GroceryItem.find({
    name: {$regex: req.query.filter || ''}
  }, null, {skip: +req.query.skip, limit: +req.query.first}).exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};