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

  let radarId;

  if (role === 'Shopper') radarId = '56db1f4613012711002229f4';

  const [createErr, createRes] = await to(User.create({
    email,
    phoneNumber,
    firstName,
    lastName,
    role,
    pushToken,
    radarId
  }));

  if (createErr) return res.status(400).json(createErr);
  return res.json(createRes);
};