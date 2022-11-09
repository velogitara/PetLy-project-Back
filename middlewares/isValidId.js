const { isValidObjectId } = require('mongoose');

const { requestError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);

  if (!result) {
    next(requestError(400, `${contactId} is not valid id.`));
  }
  next();
};

module.exports = isValidId;
