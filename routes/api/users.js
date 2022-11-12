const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/users');
const { upload, validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');
const { petSchemas } = require('../../models/pet');

const userValidation = validateBody(userSchemas.updateSchema);
const petValidation = validateBody(petSchemas.addPetSchema);
const updatePetValidation = validateBody(petSchemas.updatePetSchema);

const {
  ROUTES: { users },
} = require('../constants');

router.get(users.getCurrentUser, authenticate, controllerWrapper(controller.getCurrent));

router.put(
  users.updateUser,
  authenticate,
  userValidationMiddleware,
  controllerWrapper(controller.updateUser)
);
router.patch(
  users.updateUserAvatar,
  authenticate,
  upload.single('avatar'),
  controllerWrapper(controller.updateUserAvatar)
);

router.post(
  users.addPet,
  authenticate,
  upload.single('image'),
  petValidation,
  controllerWrapper(controller.addPet)
);

router.put(
  users.updatePet,
  authenticate,
  updatePetValidation,
  controllerWrapper(controller.updatePet)
);

router.delete(users.removePet, authenticate, controllerWrapper(controller.removePet));

module.exports = router;
