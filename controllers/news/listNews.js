const { News } = require('../../models/news');

const listNews = async (req, res) => {
  const data = await News.find({}, '-createdAt -updatedAt');
  res.json({ data });
};

module.exports = listNews;
