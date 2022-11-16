const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const getNoticeByQuery = async (req, res) => {
  const { query } = req.params;
  const { page = 1, limit = 8, category } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notice.find(
    { $text: { $search: `${query}` }, category },
    { score: { $meta: 'textScore' } },
    { skip, limit }
  ).sort({ score: { $meta: 'textScore' } });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json({ data: { query: result } });
};
module.exports = getNoticeByQuery;
