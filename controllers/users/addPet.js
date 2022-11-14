const { Pet } = require('../../models');
const { requestError, imageUploader } = require('../../helpers');

async function addPet(req, res) {
  const { user, body, file } = req;

  if (!body) {
    throw requestError(400, 'Missing fields');
  }

  const payload = body.data ? JSON.parse(body.data) : body;

  const create = await Pet.create({ ...payload, owner: user._id });

  if (!file) {
    res.status(201).json({ data: create });
    return;
  }

  const { _id } = create;

  const imageURL = await imageUploader('pets', file, _id);
  const result = await Pet.findByIdAndUpdate(_id, { imageURL }, { new: true });

  res.status(201).json({
    data: {
      pet: result,
    },
  });
}

module.exports = addPet;
