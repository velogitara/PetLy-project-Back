const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const { users: ctrl } = require('../../controllers');
const { validateBody, authenticate } = require('../../middlewares');
const { userSchemas } = require('../../models/user');

const {
  ROUTES: { users },
} = require('../constants');

module.exports = router;
