const Store = require('../../models/Store');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const [storeError, store] = await to(Store.create(req.body).exec());
  if (storeError) return res.status(400).json(storeError);
  return res.json(store);
};