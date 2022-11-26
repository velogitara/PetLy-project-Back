const { User } = require('../models');
const jwt = require('jsonwebtoken');

const { requestError } = require('../helpers');
const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const throwUnauthorizedError = () => {
  throw requestError(401, 'Unauthorized');
};

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { authorization = '' } = req.headers;
    const [bearer = '', token = null] = authorization.split(' ');
    // const token = authHeader.split(' ')[1];
    // console.log('just Token:', token);

    if (bearer !== 'Bearer') {
      throwUnauthorizedError();
    }
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
    // const refreshToken = cookies.jwt;
    // await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    // console.log('SID:', sessionId);
    // console.log('USER ID FROM AUTH MIDDLEWARE', userId);

    await jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'forbidden, token expired' });
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({ message: 'Invalid user' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    // return res.status(400).send({ message: 'No token provided' });

    next(error);
  }
};

module.exports = authenticate;
