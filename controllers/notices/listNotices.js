const { Notice } = require('../../models/notice');

const listNotices = async (req, res) => {
  // const { _id: owner } = req.user;
  const { page = 1, limit = 20, category } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find(category ? { category } : {}, '-createdAt -updatedAt', {
    skip,
    limit,
  });

  res.json(result);
};

module.exports = listNotices;
