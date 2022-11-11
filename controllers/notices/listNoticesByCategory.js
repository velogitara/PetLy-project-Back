const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const listNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const result = await Notice.find({ category }, '-createdAt -updatedAt');

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json({ data: { [category]: result } });
};

module.exports = listNoticesByCategory;
