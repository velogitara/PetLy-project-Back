const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { User, Session } = require('../../models');
// const { requestError } = require('../../helpers');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  // const activeSession = await Session.findById(req.body.sid);
  //     if (!activeSession) {
  //       return res.status(404).send({ message: "Invalid session" });
  //     }

  const cookies = req.cookies;
  console.log('WE ARE ON REFRESH ROUTE');
  console.log(cookies);
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET_KEY,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' }).exec();

      console.log(decoded);
      const foundUser = await User.findById({ _id: decoded.id });
      const session = await Session.findById({ _id: decoded.sid });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
      if (!session) {
        return res.status(404).send({ message: 'Invalid session' });
      }
      console.log(session);
      await Session.findByIdAndDelete(session._id);
      const newSession = await Session.create({
        uid: foundUser._id,
      });
      const payload = {
        id: foundUser._id,
        sid: newSession._id,
      };
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '1m',
      });
      res.json({
        token: accessToken,
      });
    })
  );
};

module.exports = refresh;
