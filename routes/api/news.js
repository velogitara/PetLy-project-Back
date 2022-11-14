const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/news');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/news');

const {
  ROUTES: { news },
} = require('../constants');

router.get(news.getAll, controllerWrapper(controller.listNews));
router.get(news.getByQuery, controllerWrapper(controller.getNewsByQuery));

router.post(
  news.getAll,
  validateBody(schemas.addNewsSchema),
  controllerWrapper(controller.addNews)
);

module.exports = router;
