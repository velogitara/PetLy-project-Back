const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const { auth: controller } = require('../../controllers');
const { validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');

const {
  ROUTES: { auth },
} = require('../constants');

router.post(
  auth.signUp,
  validateBody(userSchemas.registerSchema),
  controllerWrapper(controller.register)
);

router.post(
  auth.signIn,
  validateBody(userSchemas.signInSchema),
  controllerWrapper(controller.logIn)
);

router.post(auth.signOut, controllerWrapper(authenticate), controllerWrapper(controller.logOut));

module.exports = router;
