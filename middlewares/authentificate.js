const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const { requestError } = require('../helpers');
const { SECRET_KEY } = process.env;

const throwUnauthorizedError = () => {
  throw requestError(401, 'Not authorized');
};

const authentificate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer = '', token = null] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throwUnauthorizedError();
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throwUnauthorizedError();
      }
      req.user = user;
      next();
    } catch (error) {
      throw requestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentificate;
