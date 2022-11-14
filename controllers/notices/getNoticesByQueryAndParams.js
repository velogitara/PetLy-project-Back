const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const getNoticesByQueryAndParams = async (req, res) => {
  const { category } = req.query;

  const result = await Notice.find({ category }, '');

  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.json({ data: { result } });
};
module.exports = getNoticesByQueryAndParams;
