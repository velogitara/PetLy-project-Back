const { TokenExpiredError, verify } = require('jsonwebtoken');
const requestError = require('./requestError');

const isTokenExpired = async (token, SECRET_KEY, _id, User, user) => {
  try {
    verify(token, SECRET_KEY, user);
    console.log('TOKEN OK');
    if (user.token) {
      throw requestError(409, 'User already logged In!');
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.log(error);
      console.log('1.TOKEN EXPIRED');
      await User.findByIdAndUpdate(_id, { token: null });
      console.log('2.made null');
    }
  }
};

module.exports = isTokenExpired;
