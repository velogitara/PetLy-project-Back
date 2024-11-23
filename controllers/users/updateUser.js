const { User } = require('../../models');
const { requestError, imageUploader } = require('../../helpers');

async function updateUser(req, res) {
  const { body, file } = req;
  const { _id } = req.user;

  if (!body) {
    throw requestError(400, 'Missing fields');
  }
  const fields = 'name email location phone birthday avatarURL updatedAt';
  const payload = body.data ? JSON.parse(body.data) : body;

  let user = null;

  if (!file) {
    user = await User.findByIdAndUpdate({ _id }, payload, {
      new: true,
      fields,
    });
  } else {
    const avatarURL = await imageUploader('avatars', file, _id);
    user = await User.findByIdAndUpdate({ _id }, { ...payload, avatarURL }, { new: true, fields });
  }

  if (!user) {
    throw requestError(404, 'Not found');
  }

  res.json({
    data: {
      user,
    },
  });
}

module.exports = updateUser;
