const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/news');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/news');

const {
  ROUTES: { news },
} = require('../constants');

router.get(news.getAll, controllerWrapper(controller.getAll));

router.post(news.getAll, validateBody(schemas.joiSchema), controllerWrapper(controller.add));

module.exports = router;
