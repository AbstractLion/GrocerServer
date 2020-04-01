const User = require('../../models/User');
const to = require('await-to-js').default;

module.exports = async (req, res) => {
  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    role,
    pushToken,
  } = req.body;

  const [createErr, createRes] = await to(User.create({
    email,
    phoneNumber,
    firstName,
    lastName,
    role,
    pushToken,
    radarId: ''
  }));

  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};