const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {storeId, skip, first} = req.query;
  const [findErr, findRes] = await to(GroceryList.find({storeId}).populate('user').sort({createdAt: 'asc'}).populate('items').exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};
