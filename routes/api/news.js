const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/news');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/news');

const {
  ROUTES: { news },
} = require('../constants');

router.get(news.listNews, controllerWrapper(controller.listNews));

router.post(
  news.addNews,
  authenticate,
  validateBody(schemas.addNewsSchema),
  controllerWrapper(controller.addNews)
);

module.exports = router;
