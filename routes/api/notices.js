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

router.post(
  notices.addNotice,
  authenticate,
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addNotice)
);

// router.put(
//   notices.updateNotice,
//   isValidId,
//   validateBody(schemas.updateSchema),
//   controllerWrapper(controller.updateNotice)
// );

// router.delete(notices.removeNotice, isValidId, controllerWrapper(controller.removeContact));

module.exports = router;
