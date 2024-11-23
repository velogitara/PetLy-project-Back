const { requestError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
    const { error } = schema.validate(payload);

    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
