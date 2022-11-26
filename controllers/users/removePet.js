const { Pet } = require('../../models');
const { requestError, imageRemover } = require('../../helpers');

async function removePet(req, res) {
  const { user } = req;
  const { petId } = req.params;

  const pet = await Pet.findOneAndRemove({
    $and: [{ _id: petId }, { owner: user._id }],
  });

  if (!pet) {
    throw requestError(404, 'Not found');
  }

  await imageRemover(pet.imageURL).then(
    res.json({
      message: 'Pet deleted successfully!',
    })
  );
}

module.exports = removePet;
