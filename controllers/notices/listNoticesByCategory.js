const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const listNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Notice.find({ category }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email phone');

  if (!result) {
    throw requestError(404, `Notices not found in category ${category}`);
  }

  res.json({ data: { notices: result } });
};

module.exports = listNoticesByCategory;
