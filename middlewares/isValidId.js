const { isValidObjectId } = require('mongoose');

const { requestError } = require('../helpers');

const isValidId = (req, res, next) => {
  const [Id] = Object.values(req.params);
  const result = isValidObjectId(Id);

  if (!result) {
    next(requestError(400, `${Id} is not valid id.`));
  }
  next();
};

module.exports = isValidId;
