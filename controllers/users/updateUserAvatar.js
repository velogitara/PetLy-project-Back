const { User } = require('../../models');
const { requestError, imageUploader } = require('../../helpers');

const updateUserAvatar = async (req, res, next) => {
  const { file } = req;
  const { _id } = req.user;

  if (!file) {
    throw requestError(400, 'Missing file');
  }

  const avatarURL = await imageUploader('avatars', file, _id);

  const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true, fields: 'avatarURL' });
  res.json({ data: { user: user } });
};
module.exports = updateUserAvatar;
