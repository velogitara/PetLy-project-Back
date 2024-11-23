const bcrypt = require('bcrypt');

const hasher = async (value, saltNumber = 10) => {
  return await bcrypt.hash(value, saltNumber);
};

module.exports = hasher;
