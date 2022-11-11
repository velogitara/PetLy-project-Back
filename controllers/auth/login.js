const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { TokenExpiredError, verify } = require('jsonwebtoken');

const { User } = require('../../models');
const { requestError } = require('../../helpers');
const { TOKEN_EXPIRES_IN } = process.env;

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  //   const { _id } = user;
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

  //   const verifyToken = async (token, SECRET_KEY) => {
  //     try {
  //       verify(token, SECRET_KEY);
  //       console.log(token);
  //       console.log('TOKEN OK');
  //     } catch (error) {
  //       if (error instanceof TokenExpiredError) {
  //         // console.log(error);
  //         console.log('1.TOKEN EXPIRED');
  //         await User.findByIdAndUpdate(_id, { token: token });
  //         console.log('2.made null');
  //       }
  //     }
  //   };
  //   await verifyToken(user.token, SECRET_KEY);

  if (user.token) {
    console.log('next if happened');
    throw requestError(409, 'User already logged In!');
  }

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    data: {
      token: token,
    },
  });
};

module.exports = logIn;
