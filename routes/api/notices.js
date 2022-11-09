const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/notices');
// const { validateBody, isValidId } = require('../../middlewares');
// const { schemas } = require('../../models/notices');
const {
  ROUTES: { notices },
} = require('../constants');

console.log(notices.getAll);

router.get(notices.getAll, controllerWrapper(controller.listNotices));

// router.get(notices.getById, isValidId, controllerWrapper(controller.getNoticeById));

// router.post(
//   notices.addNotice,
//   validateBody(schemas.addSchema),
//   controllerWrapper(controller.addNotice)
// );

// router.put(
//   notices.updateNotice,
//   isValidId,
//   validateBody(schemas.updateSchema),
//   controllerWrapper(controller.updateNotice)
// );

// router.delete(notices.removeNotice, isValidId, controllerWrapper(controller.removeContact));

module.exports = router;
