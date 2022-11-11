const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/notices');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/notice');
const {
  ROUTES: { notices },
} = require('../constants');

router.get(notices.getAll, controllerWrapper(controller.listNotices));

router.get(notices.getByCategory, controllerWrapper(controller.listNoticesByCategory));

router.get(notices.getById, isValidId, controllerWrapper(controller.getNoticeById));

router.get(notices.listUserNotices, isValidId, controllerWrapper(controller.listUserNotices));

router.post(
  notices.addNotice,
  authenticate,
  validateBody(schemas.addNoticeSchema),
  controllerWrapper(controller.addNotice)
);

router.patch(
  notices.updateFavorite,
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

// router.put(
//   notices.updateNotice,
//   isValidId,
//   validateBody(schemas.updateSchema),
//   controllerWrapper(controller.updateNotice)
// );

// router.delete(notices.removeNotice, isValidId, controllerWrapper(controller.removeContact));

module.exports = router;
