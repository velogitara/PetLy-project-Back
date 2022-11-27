const { News } = require('../../models/news');

const listNews = async (req, res) => {
  const { page = 1, limit = 6, query } = req.query;
  const skip = (page - 1) * limit;
  const count = await News.count(query ? { $text: { $search: `${query}` } } : {});
  const data = await News.find(query ? { $text: { $search: `${query}` } } : {}, ' ', {
    skip,
    limit,
  }).sort({ createdAt: -1 });

  const totalPages = Math.ceil(count / limit);

  res.json({ data: { news: data, totalPages } });
};

module.exports = listNews;
