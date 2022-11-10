const { User } = require('../../models');

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.json({
    status: 'success',
    code: 204,
    data: {
      message: 'logout success ',
    },
  });
};

module.exports = logOut;
