const { Notice } = require('../../models/notice');
const { requestError, imageRemover } = require('../../helpers');

const removeNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
  const result = await Notice.findOneAndRemove({
    $and: [{ _id: noticeId }, { owner: owner }],
  });

  if (!result) {
    throw requestError(404, 'Notice not found');
  }

  await imageRemover(result.imageURL).then(res.json({ message: 'Notice successfuly deleted' }));
};

module.exports = removeNotice;
