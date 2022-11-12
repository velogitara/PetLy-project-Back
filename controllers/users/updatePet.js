const { Pet } = require('../../models');
const { requestError } = require('../../helpers');

async function updatePet(req, res) {
  const { body } = req;
  const { petId } = req.params;

  if (!body) {
    throw requestError(400, 'Missing fields');
  }

  const pet = await Pet.findByIdAndUpdate({ _id: petId }, body, {
    new: true,
  });

  if (!pet) {
    throw requestError(404, 'Not found');
  }

  res.json({
    data: {
      pet,
    },
  });
}

module.exports = updatePet;
