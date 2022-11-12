const { News } = require('../../models/news');

const listNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;
  const data = await News.find({}, '', {
    skip,
    limit,
  });

  res.json({ data: { news: data } });
};

module.exports = listNews;
