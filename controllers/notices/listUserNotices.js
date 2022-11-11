const { Notice } = require('../../models');

const listUserNotices = async (req, res) => {
  const { userId: owner } = req.params;
  const { favorite } = req.query;

  const notices = await Notice.find(
    favorite ? { owner, favorite: { $in: [owner] } } : { owner },
    '-createdAt -updatedAt'
  );

  res.json({
    data: {
      notices,
    },
  });
};
module.exports = listUserNotices;
