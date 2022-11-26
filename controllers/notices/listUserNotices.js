const { Notice } = require('../../models');
const { requestError } = require('../../helpers');

const listUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8, favorite } = req.query;
  const skip = (page - 1) * limit;

  const count = await Notice.count(favorite ? { favorite: owner } : { owner });
  const notices = await Notice.find(
    favorite ? { favorite: owner } : { owner },
    '-name -sex -comments -createdAt -updatedAt',
    {
      skip,
      limit,
    }
  )
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
