const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/users');
const { upload, validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');

const userValidationMiddleware = validateBody(userSchemas.updateSchema);

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

module.exports = router;
