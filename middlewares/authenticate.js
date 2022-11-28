const { User } = require('../models');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const { requestError } = require('../helpers');
const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const throwUnauthorizedError = () => {
  throw requestError(401, 'Unauthorized');
};

const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { authorization = '' } = req.headers;
    const [bearer = '', token = null] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throwUnauthorizedError();
    }

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
    next(error);
  }
});

module.exports = authenticate;
