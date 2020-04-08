const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {storeId, skip, first} = req.query;
  const [findErr, findRes] = await to(GroceryList.find({
    storeId,
    activated: false
  })
  .populate('user').populate("items.item").sort({createdAt: 'asc'}).exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};
