const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { User } = require('../../models');
// const { requestError } = require('../../helpers');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

const refresh = (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies);
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET_KEY,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' }).exec();

      // console.log(decoded);
      const foundUser = await User.findById({ _id: decoded.id });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
      // console.log(foundUser);

      const payload = {
        id: foundUser._id,
      };
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: '15m',
      });
      res.json({
        data: { token: accessToken },
      });
    })
  );
};

module.exports = refresh;
