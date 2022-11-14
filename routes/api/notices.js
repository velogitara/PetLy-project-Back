const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/notices');
const { authenticate, validateBody, isValidId, upload } = require('../../middlewares');
const { schemas } = require('../../models/notice');
const {
  ROUTES: { notices },
} = require('../constants');

router.get(notices.getAll, controllerWrapper(controller.listNotices));

router.get(notices.getByCategory, controllerWrapper(controller.listNoticesByCategory));

router.get(notices.listUserNotices, authenticate, controllerWrapper(controller.listUserNotices));

router.get(
  notices.getNoticesByQueryAndParams,
  controllerWrapper(controller.getNoticesByQueryAndParams)
);

router.get(notices.getById, isValidId, controllerWrapper(controller.getNoticeById));

router.get(notices.getByQuery, controllerWrapper(controller.getNoticeByQuery));

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
  controllerWrapper(controller.updateFavorite)
);

// router.put(
//   notices.updateNotice,
//   isValidId,
//   validateBody(schemas.updateSchema),
//   controllerWrapper(controller.updateNotice)
// );

router.delete(
  notices.removeNotice,
  authenticate,
  isValidId,
  controllerWrapper(controller.removeNotice)
);

module.exports = router;
