const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const { auth: ctrl } = require('../../controllers');
const { validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');

const {
  ROUTES: { auth },
} = require('../constants');

// router.get('/', controllerWrapper(controller.getAllUsers));

router.post(
  auth.signUp,
  validateBody(userSchemas.registerSchema),
  controllerWrapper(ctrl.register)
);

router.post(auth.signIn, validateBody(userSchemas.signInSchema), controllerWrapper(ctrl.logIn));

router.get(auth.signOut, controllerWrapper(authenticate), controllerWrapper(ctrl.logOut));

module.exports = router;
