const { Notice } = require('../../models');

const updateFavorites = async (req, res) => {
  const { _id } = req.user;
  const { favorite } = req.body;
  const { noticeId } = req.params;
  const action = favorite ? { $addToSet: { favorite: _id } } : { $pull: { favorite: _id } };
  await Notice.findByIdAndUpdate({ _id: noticeId }, action);

  res.json({ message: `Successfuly: ${favorite ? 'add to' : 'removed from'} Favorites` });
};

module.exports = updateFavorites;
