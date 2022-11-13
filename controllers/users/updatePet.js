const { Pet } = require('../../models');
const { requestError, imageUploader } = require('../../helpers');

async function updatePet(req, res) {
  const { body, file } = req;
  const { petId } = req.params;

  if (!body) {
    throw requestError(400, 'Missing fields');
  }

  const fields = 'name birthday breed imageURL owner updatedAt';
  const payload = body.data ? JSON.parse(body.data) : body;

  let pet = null;

  if (!file) {
    pet = await Pet.findByIdAndUpdate({ _id: petId }, payload, {
      new: true,
      fields,
    });
  } else {
    const imageURL = await imageUploader('pets', file, petId);
    pet = await Pet.findByIdAndUpdate(
      { _id: petId },
      { ...payload, imageURL },
      { new: true, fields }
    );
  }

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
