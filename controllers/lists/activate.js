const GroceryList = require('../../models/GroceryList');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {qrCode} = req.params;
  const [findErr, findRes] = await to(GroceryList.findOne({qrCode}).exec());
  if (findErr) return res.status(400).json(findErr);
  if (findRes.activated) return res.status(301).json({message: "Already activated."});
  findRes.activated = true;
  await findRes.save();
  return res.json(findRes);
};