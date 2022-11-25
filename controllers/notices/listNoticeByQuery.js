const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const listNoticeByQuery = async (req, res) => {
  const { page = 1, limit = 8, query, category } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notice.find(
    { $text: { $search: `${query}` }, category },
    { score: { $meta: 'textScore' } },
    { skip, limit }
  )
    .populate('owner', 'name email phone')
    .sort({ score: { $meta: 'textScore' } })
    .sort({ createdAt: -1 });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json({ data: { query: result } });
};
module.exports = listNoticeByQuery;
