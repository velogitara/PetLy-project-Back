const bcrypt = require('bcryptjs');
// bcrypt !!!
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { requestError } = require('../../helpers');

const { TOKEN_EXPIRES_IN } = process.env;

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // const { _id } = user;
  if (!user) {
    throw requestError(401, 'Email or password wrong');
  }
  //   if (!user.verify) {
  //     throw requestError('Email not verify');
  //   }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw requestError(401, 'Email or password wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });

  // await isTokenExpired(user.token, SECRET_KEY, _id, User);

  if (user.token) {
    throw requestError(409, 'User already logged In!');
  }
  const result = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  res.json({ data: { token: result.token } });
};

module.exports = logIn;
