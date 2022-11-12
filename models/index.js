const { User, userSchemas } = require('./user');
const { Notice, schemas } = require('./notice');
const { Pet, petSchemas } = require('./pet');

module.exports = {
  User,
  Notice,
  Pet,
  userSchemas,
  schemas,
  petSchemas,
};
