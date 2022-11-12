const { Pet } = require('../../models');
const { requestError } = require('../../helpers');

async function removePet(req, res) {
  const { petId } = req.params;

  const pet = await Pet.findByIdAndRemove({ _id: petId });

  if (!pet) {
    throw requestError(404, 'Not found');
  }

  res.json({
    data: {
      pet,
    },
  });
}

module.exports = removePet;
