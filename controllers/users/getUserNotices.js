const { Notice } = require('../../models');

const getUserNotices = async (req, res) => {
  const { _id: owner, name, email, location, birthday, phone } = req.user;

  const notices = await Notice.find({ owner });

  res.json({
    data: {
      user: {
        name,
        email,
        location,
        birthday,
        phone,
      },
      notices,
    },
  });
};
module.exports = getUserNotices;
