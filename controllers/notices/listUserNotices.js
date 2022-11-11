const { Notice } = require('../../models');

const listUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite } = req.query;

  const notices = await Notice.find(
    favorite ? { favorite: owner } : { owner },
    '-createdAt -updatedAt'
  );

  res.json({
    data: {
      notices,
    },
  });
};
module.exports = listUserNotices;
