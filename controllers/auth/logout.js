// const { User } = require('../../models');

const logOut = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); /* No content */

  // const { _id } = req.user;
  // await User.findByIdAndUpdate(_id, { token: null });
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });
  res.json({
    message: 'logout success, Cookie cleared ',
  });
};

// ====== web example
// const logout = (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204); //No content
//   res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//   res.json({ message: 'Cookie cleared' });
// };

module.exports = logOut;
