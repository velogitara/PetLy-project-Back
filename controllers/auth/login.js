const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Session } = require('../../models');
const { requestError } = require('../../helpers');
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, 'User not found');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw requestError(401, 'Email or password wrong');
  }
  const newSession = await Session.create({
    uid: user._id,
  });

  const payload = {
    id: user._id,
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
    data: {
      token: accessToken,
      id: user._id,
    },
  });
});

module.exports = logIn;
