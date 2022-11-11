const { News } = require('../../models/news');

const getAll = async (req, res) => {
  // const { _id: owner } = req.user;

  const data = await News.find({}, '-createdAt -updatedAt');
  res.json({ data });
};

module.exports = getAll;
