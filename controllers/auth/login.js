const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TokenExpiredError, verify } = require('jsonwebtoken');

const { User } = require('../../models');
const { requestError } = require('../../helpers');

const { TOKEN_EXPIRES_IN } = process.env;

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, 'User not found');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw requestError(401, 'Email or password wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRES_IN });

  const { token: currentToken = '456asd' } = user;
  if (!currentToken) {
    await User.findByIdAndUpdate(user._id, { token }, { new: true });
  }

  const isTokenExpired = async (currentToken, SECRET_KEY) => {
    try {
      console.log('checking token');
      verify(currentToken, SECRET_KEY);
      return await User.findByIdAndUpdate(user._id, { token }, { new: true });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log('token expired or broken');
        console.log('token ReWrite');
        return await User.findByIdAndUpdate(user._id, { token }, { new: true });
      }
    }
  };

  // if (!user.token) {
  //   await isTokenExpired(currentToken, SECRET_KEY);
  // }

  const result = await isTokenExpired(currentToken, SECRET_KEY);

  console.log('verification complete');

  // const result = await User.findByIdAndUpdate(user._id, { token }, { new: true });

  // {
  //   data: result.token
  //     ? { token: result.token }
  //     : { message: 'User already logged In, Token is valid' },
  // }
  res.json({
    data: {
      token: result.token,
      id: result._id,
    },
  });
};

module.exports = logIn;
