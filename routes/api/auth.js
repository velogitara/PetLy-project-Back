const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const { auth: ctrl } = require('../../controllers');
const { validateBody } = require('../../middlewares');
const { userSchemas } = require('../../models/user');

const {
  ROUTES: { auth },
} = require('../constants');

// console.log(auth.signUp);

// router.get('/', controllerWrapper(controller.getAllUsers));

router.post(
  auth.signUp,
  validateBody(userSchemas.registerSchema),
  controllerWrapper(ctrl.register)
);

module.exports = router;
