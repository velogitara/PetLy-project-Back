const { Pet } = require('../../models');
const { requestError } = require('../../helpers');

async function addPet(req, res) {
  const { _id } = req.user;
  const { body } = req;

  if (!body) {
    throw requestError(400, 'Missing fields');
  }

  const pet = await Pet.create({ ...body, owner: _id });

  res.status(201).json({
    data: {
      pet,
    },
  });
}

module.exports = addPet;
