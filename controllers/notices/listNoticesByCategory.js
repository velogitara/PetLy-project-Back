const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const listNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8, query } = req.query;
  const skip = (page - 1) * limit;

  let dbRequest = {};

  if (!query) {
    dbRequest = { category };
  } else {
    dbRequest = { $text: { $search: `${query}` }, category };
  }

  const count = await Notice.count(dbRequest);
  const result = await Notice.find(dbRequest, '-name -sex -comments -createdAt -updatedAt', {
    skip,
    limit,
  })
    .populate('owner', 'name email phone')
    .sort({ createdAt: -1 });

  if (!result) {
    throw requestError(404, `Notices not found in category ${category}`);
  }

  const totalPages = Math.ceil(count / limit);

  res.json({ data: { notices: result, totalPages } });
};

module.exports = listNoticesByCategory;
