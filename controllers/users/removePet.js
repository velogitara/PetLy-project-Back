const { Pet } = require('../../models');
const { requestError } = require('../../helpers');

async function removePet(req, res) {
  const { user } = req;
  const { petId } = req.params;

  const pet = await Pet.findOneAndRemove({
    $and: [{ _id: petId }, { owner: user._id }],
  });

  if (!pet) {
    throw requestError(404, 'Not found');
  }

  res.json({
    message: 'Pet deleted succesfully!',
  });
}

module.exports = removePet;
