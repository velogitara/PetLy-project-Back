const { News } = require('../../models/news');
const { requestError } = require('../../helpers');

const getNewsByQuery = async (req, res) => {
  const { page = 1, limit = 6, query } = req.query;
  const skip = (page - 1) * limit;
  const result = await News.find({ $text: { $search: `${query}` } }, '', {
    skip,
    limit,
  }).sort({ date: -1 });

  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.json({ data: { news: result } });
};
module.exports = getNewsByQuery;
