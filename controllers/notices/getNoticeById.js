const { Notice } = require('../../models/notice');
const { requestError } = require('../../helpers');

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const result = await Notice.findById(noticeId).populate('owner', 'name email phone');

  if (!result) {
    throw requestError(404, 'Notice not found');
  }

  res.json({ data: { notice: result } });
};

module.exports = getNoticeById;
