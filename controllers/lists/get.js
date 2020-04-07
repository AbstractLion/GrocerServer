const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {storeId, skip, first} = req.query;
  const [findErr, findRes] = await to(GroceryList.find({storeId})
  .populate('user').populate({
    path: 'items',
    populate: { path: 'item' }
  }).sort({createdAt: 'asc'}).exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};
