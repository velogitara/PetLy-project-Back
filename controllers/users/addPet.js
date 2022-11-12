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

// const path = require('path');
// const fs = require('fs/promises');

// const { Pet } = require('../../models');
// const { requestError } = require('../../helpers');

// const imagesDir = path.join(__dirname, '../../', 'public', 'pets');

// async function addPet(req, res, next) {
//   const { _id } = req.user;
//   const { body, file } = req;
//   console.log(req);

//   if (!body && !file) {
//     throw requestError(400, 'Missing fields');
//   }

//   let pet;

//   if (file) {
//     const { path: tempUpload, originalname } = req.file;
//     const fileName = `${req.user._id}_${originalname}`;

//     try {
//       const resultUpload = path.join(imagesDir, fileName);
//       await fs.rename(tempUpload, resultUpload);
//       const imageUrl = path.join('pets', fileName);
//       pet = await Pet.create({ ...body, owner: _id, imageUrl });
//     } catch (error) {
//       await fs.unlink(tempUpload);
//       next(error);
//     }
//   } else {
//     pet = await Pet.create({ ...body, owner: _id });
//   }

//   res.status(201).json({
//     data: {
//       pet,
//     },
//   });
// }

// module.exports = addPet;
