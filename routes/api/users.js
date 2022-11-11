const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const { users: ctrl } = require('../../controllers');
const { upload, validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');

const userValidationMiddleware = validateBody(userSchemas.updateSchema);

const {
  ROUTES: { users },
} = require('../constants');

router.get(users.getCurrentUser, authenticate, controllerWrapper(ctrl.getCurrent));
router.put(
  users.updateUser,
  authenticate,
  userValidationMiddleware,
  controllerWrapper(ctrl.updateUser)
);
router.patch(
  users.updateUserAvatar,
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateUserAvatar)
);

module.exports = router;
