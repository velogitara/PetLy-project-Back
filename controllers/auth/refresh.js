const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { User, Session } = require('../../models');
// const { requestError } = require('../../helpers');
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

const refresh = async (req, res) => {
  // const activeSession = await Session.findById(req.body.sid);
  //     if (!activeSession) {
  //       return res.status(404).send({ message: "Invalid session" });
  //     }
  console.log(req.user);
  const cookies = req.cookies;
  console.log('WE ARE ON REFRESH ROUTE');
  // console.log(cookies);
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  await jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET_KEY,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Refresh token expired' });
      }

      // console.log(decoded);
      const foundUser = await User.findById({ _id: decoded.id });
      const session = await Session.findById({ _id: decoded.sid });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
      if (!session) {
        return res.status(404).send({ message: 'Invalid session' });
      }
      console.log('SESSION', session);
      await Session.findByIdAndDelete(session._id);
      const newSession = await Session.create({
        uid: foundUser._id,
      });
      const payload = {
        id: foundUser._id,
        sid: newSession._id,
      };
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      });

      res.cookie('jwt', refreshToken, {
        httpOnly: true /* accessible only by web server */,
        secure: true /* https */,
        sameSite: 'None' /* cross-site cookie */,
        maxAge: 7 * 24 * 60 * 60 * 1000 /* cookie expiry: set to match rT */,
      });
      res.json({
        token: accessToken,
      });
    })
  );
};

module.exports = refresh;
