const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
// const { TokenExpiredError } = require('jsonwebtoken');

// const { requestError } = require('../helpers');
const { ACCESS_TOKEN_SECRET_KEY } = process.env;

// const throwUnauthorizedError = () => {
//   throw requestError(401, 'Unauthorized');
// };

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // const { authorization = '' } = req.headers;
    // const [bearer = '', token = null] = authorization.split(' ');
    const token = authHeader.split(' ')[1];
    console.log('just Token:', token);

    // if (bearer !== 'Bearer') {
    //   throwUnauthorizedError();
    // }

    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(id);
    console.log('User Data:', user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('something went wrong');
    next(error);
  }
};

module.exports = authenticate;
