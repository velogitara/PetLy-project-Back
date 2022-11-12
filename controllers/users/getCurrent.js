const { Pet } = require('../../models');

const getCurrent = async (req, res) => {
  const { _id, name, email, birthday, phone, location, createdAt } = req.user;

  const pets = await Pet.find({ owner: _id }, '-createdAt -updatedAt');

  res.json({
    data: {
      user: {
        name,
        email,
        birthday,
        phone,
        location,
        created: createdAt,
      },
      pets,
    },
  });
};
module.exports = getCurrent;
