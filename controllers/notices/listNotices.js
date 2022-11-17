const { Notice } = require('../../models/notice');

const listNotices = async (req, res) => {
  // const { _id: owner } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Notice.find({}, '-name -sex - comments -createdAt -updatedAt', {
    skip,
    limit,
  });

  res.json({ data: { notices: result } });
};

module.exports = listNotices;
