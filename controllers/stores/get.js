const Store = require('../../models/Store');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const [findErr, findRes] = await to(Store.find({}).exec());
  if (findErr) return res.status(400).json(findErr);
  return res.json(findRes);
};