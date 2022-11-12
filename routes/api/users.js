const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/users');
const { upload, validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');
const { petSchemas } = require('../../models/pet');

const userValidation = validateBody(userSchemas.updateSchema);
const petValidtion = validateBody(petSchemas.addPetSchema);
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
  petValidtion,
  controllerWrapper(ctrl.addPet)
);

router.put(users.updatePet, authenticate, updatePetValidation, controllerWrapper(ctrl.updatePet));

router.delete(users.removePet, authenticate, controllerWrapper(ctrl.removePet));

module.exports = router;
