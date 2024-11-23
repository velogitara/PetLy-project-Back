const { Notice } = require('../../models');
const { requestError } = require('../../helpers');

const listUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8, favorite, query } = req.query;
  const skip = (page - 1) * limit;

  let dbRequest = {};

  if (!query) {
    dbRequest = favorite ? { favorite: owner } : { owner };
  } else if (favorite) {
    dbRequest = { $text: { $search: `${query}` }, favorite: owner };
  } else {
    dbRequest = { $text: { $search: `${query}` }, owner };
  }

  const count = await Notice.count(dbRequest);
  const notices = await Notice.find(dbRequest, '-name -sex -comments -createdAt -updatedAt', {
    skip,
    limit,
  })
    .populate('owner', 'name email phone')
    .sort({ createdAt: -1 });

  if (!notices) {
    throw requestError(404, `Notices not found`);
  }

  const totalPages = Math.ceil(count / limit);

  res.json({
    data: {
      notices,
      totalPages,
    },
  });
};
module.exports = listUserNotices;
