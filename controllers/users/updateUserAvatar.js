const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../models');
const { requestError } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

async function updateUserAvatar(req, res, next) {
  const { file } = req;

  if (!file) {
    throw requestError(400, 'Missing fields');
  }

  const { path: tempUpload, originalname } = req.file;
  const fileName = `${req.user._id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('avatars', fileName);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl },
      {
        new: true,
        select: 'avatarURL',
      }
    );
    res.json({
      data: {
        user: user,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
}

module.exports = updateUserAvatar;
