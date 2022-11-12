const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const { users: ctrl } = require('../../controllers');
const { upload, validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');
const { petSchemas } = require('../../models/pet');

const userValidation = validateBody(userSchemas.updateSchema);
const petValidtion = validateBody(petSchemas.addPetSchema);
const updatePetValidation = validateBody(petSchemas.updatePetSchema);

const {
  ROUTES: { users },
} = require('../constants');

router.get(users.getCurrentUser, authenticate, controllerWrapper(ctrl.getCurrent));

router.put(users.updateUser, authenticate, userValidation, controllerWrapper(ctrl.updateUser));

router.patch(
  users.updateUserAvatar,
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateUserAvatar)
);

router.post(users.addPet, authenticate, petValidtion, controllerWrapper(ctrl.addPet));

router.put(users.updatePet, authenticate, updatePetValidation, controllerWrapper(ctrl.updatePet));

router.delete(users.removePet, authenticate, controllerWrapper(ctrl.removePet));

module.exports = router;
