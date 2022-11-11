const { User } = require('../../models');
const { requestError } = require('../../helpers');

async function updateUser(req, res, next) {
  const { body } = req;

  if (!body) {
    throw requestError(400, 'Missing fields');
  }

  const user = await User.findByIdAndUpdate(req.user._id, body, {
    new: true,
    select: 'name email location birthday phone',
  });

  if (!user) {
    throw requestError(404, 'Not found');
  }

  res.json({
    data: {
      user: user,
    },
  });
}

module.exports = updateUser;
