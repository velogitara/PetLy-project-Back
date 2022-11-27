const { Session } = require('../../models');
const { REFRESH_TOKEN_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const logOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); /* No content */

  const refreshToken = cookies.jwt;

  const { sid } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);

  if (!sid) return res.send(403).json({ message: 'invalid session' });

  await Session.findByIdAndDelete(sid);

  // const { _id } = req.user;
  // await User.findByIdAndUpdate(_id, { token: null });
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({
    message: 'logout success, Cookie cleared ',
  });
};

module.exports = logOut;
