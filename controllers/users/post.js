const User = require('../../models/User');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    pushToken
  } = req.body;

  const [createErr, createRes] = await to(User.create({
    email,
    phoneNumber,
    firstName,
    lastName,
    pushToken
  }));

  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};