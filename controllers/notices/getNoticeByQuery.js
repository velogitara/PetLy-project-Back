const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const getNoticeByQuery = async (req, res) => {
  const { query } = req.params;
  const result = await Notice.find({ $text: { $search: query } });
  console.log(typeof query);

  if (!result) {
    throw requestError(404, 'Not found');
  }

  res.json({ data: { query: result } });
};
module.exports = getNoticeByQuery;
