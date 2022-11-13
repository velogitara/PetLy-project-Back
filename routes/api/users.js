const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/users');
const { upload, validateBody, authenticate, isValidId } = require('../../middlewares');
const { userSchemas } = require('../../models/user');
const { petSchemas } = require('../../models/pet');

const userValidation = validateBody(userSchemas.updateSchema);
const petValidation = validateBody(petSchemas.addPetSchema);
const updatePetValidation = validateBody(petSchemas.updatePetSchema);

const {
  ROUTES: { users },
} = require('../constants');

router.get(users.getCurrentUser, authenticate, controllerWrapper(controller.getCurrent));

router.patch(
  users.updateUser,
  authenticate,
  upload.single('image'),
  userValidation,
  controllerWrapper(controller.updateUser)
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
  isValidId,
  upload.single('image'),
  updatePetValidation,
  controllerWrapper(controller.updatePet)
);

router.delete(users.removePet, authenticate, isValidId, controllerWrapper(controller.removePet));

module.exports = router;
