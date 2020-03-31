module.exports = async (req, res) => {
  console.log(JSON.stringify(req.body));
  res.json({message: 'works'});
};