// endpoint for edit cardPet
// endpoint for add cartPet
// endpoint for remove cartPet
// model userPet

const { Pet } = require('../../models');

const getCurrent = async (req, res) => {
  const { _id: owner, name, email, birthday, phone, location, createdAt } = req.user;

  // const userPets = Pet.find(owner, '',).populate('pets','')

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
    },
  });
};
module.exports = getCurrent;
