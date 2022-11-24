const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { requestError } = require('../../helpers');
const { User } = require('../../models');
// const { TOKEN_EXPIRES_IN } = process.env;
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

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

  // const newSession = await Session.create({
  //   uid: userId,
  // });

  const payload = {
    uid: userId,
    // sid: newSession._id,
  };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '7d',
  });

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true /* accessible only by web server */,
    secure: false /* https */,
    sameSite: 'None' /* cross-site cookie */,
    maxAge: 7 * 24 * 60 * 60 * 1000 /* cookie expiry: set to match rT */,
  });

  // const result = await User.findByIdAndUpdate(userId, { accessToken }, { new: true });

  // Send accessToken containing userId

  res.status(201).json({
    data: {
      token: accessToken,
      id: userId,
    },
  });
});

module.exports = register;
