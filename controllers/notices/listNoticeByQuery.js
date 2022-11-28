const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const listNoticeByQuery = async (req, res) => {
  const { page = 1, limit = 8, query, category, own, favorite } = req.query;
  const owner = req?.user?._id ?? '';
  const skip = (page - 1) * limit;

  console.log(owner);

  let searchQuery = '';

  if (category) {
    searchQuery = { $text: { $search: `${query}` }, category };
  } else if (own) {
    searchQuery = { $text: { $search: `${query}` }, owner: owner };
  } else if (favorite) {
    searchQuery = { $text: { $search: `${query}` }, favorite: owner };
  }

  const result = await Notice.find(searchQuery, { score: { $meta: 'textScore' } }, { skip, limit })
    .populate('owner', 'name email phone')
    .sort({ score: { $meta: 'textScore' } });

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json({ data: { query: result } });
};
module.exports = listNoticeByQuery;
