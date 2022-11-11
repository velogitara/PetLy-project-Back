const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const { users: ctrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');
// const { userSchemas } = require('../../models/user');

const {
  ROUTES: { users },
} = require('../constants');

router.get(users.getUserNotices, authenticate, controllerWrapper(ctrl.getUserNotices));

module.exports = router;
