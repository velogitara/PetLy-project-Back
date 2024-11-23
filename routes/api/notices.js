const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/notices');
const { authenticate, validateBody, isValidId, upload } = require('../../middlewares');
const { schemas } = require('../../models/notice');
const {
  ROUTES: { notices },
} = require('../constants');

// router.get(notices.listNoticesByQuery, controllerWrapper(controller.listNoticeByQuery));

// router.get(notices.listNotices, controllerWrapper(controller.listNotices));

router.get(notices.listNoticesByCategory, controllerWrapper(controller.listNoticesByCategory));

router.get(notices.listUserNotices, authenticate, controllerWrapper(controller.listUserNotices));

router.get(notices.getNoticeById, isValidId, controllerWrapper(controller.getNoticeById));

router.post(
  notices.addNotice,
  authenticate,
  upload.single('image'),
  validateBody(schemas.addNoticeSchema),
  controllerWrapper(controller.addNotice)
);

router.patch(
  notices.updateFavorites,
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorites)
);

router.delete(
  notices.removeNotice,
  authenticate,
  isValidId,
  controllerWrapper(controller.removeNotice)
);

module.exports = router;
