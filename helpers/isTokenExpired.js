const { TokenExpiredError, verify } = require('jsonwebtoken');

const isTokenExpired = async (token, SECRET_KEY, _id, User) => {
  try {
    verify(token, SECRET_KEY);
    // console.log(token);
    console.log('TOKEN OK');
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // console.log(error);
      console.log('1.TOKEN EXPIRED');
      await User.findByIdAndUpdate(_id, { token: null });
      console.log('2.made null');
    }
  }
};

module.exports = isTokenExpired;
