const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { requestError } = require('../../helpers');
const { User, Session } = require('../../models');
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    name,
    email,
    password: hashPassword,
    phone,
  });

  const { _id: userId } = createUser;

  const newSession = await Session.create({
    uid: userId,
  });

  const payload = {
    id: userId,
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

  res.status(201).json({
    data: {
      token: accessToken,
      id: userId,
    },
  });
});

module.exports = register;
