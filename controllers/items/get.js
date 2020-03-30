const GroceryItem = require('../../models/GroceryItem');

module.exports = async (req, res) => {
  GroceryItem.find({
    name: {$regex: req.query.filter || ''}
  }).then(result => res.json(result));
};