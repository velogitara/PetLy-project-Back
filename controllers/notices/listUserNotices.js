const { Notice } = require('../../models');

const listUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8, favorite } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find(
    favorite ? { favorite: owner } : { owner },
    '-name -sex -comments -createdAt -updatedAt',
    {
      skip,
      limit,
    }
  ).populate('owner', 'name email phone');

  res.json({
    data: {
      notices,
    },
  });
};
module.exports = listUserNotices;
