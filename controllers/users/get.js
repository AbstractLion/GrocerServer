const User = require('../../models/User');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  
  const [findErr, findRes] = await to(GroceryList.findOne({qrCode: req.params.id}).exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};
