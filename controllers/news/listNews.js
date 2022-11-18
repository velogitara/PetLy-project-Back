const { News } = require('../../models/news');

const listNews = async (req, res) => {
  const { page = 1, limit = 6, query } = req.query;
  const skip = (page - 1) * limit;
  const data = await News.find(query ? { $text: { $search: `${query}` } } : {}, ' ', {
    skip,
    limit,
  }).sort({ date: -1 });

  res.json({ data: { news: data } });
};

module.exports = listNews;
