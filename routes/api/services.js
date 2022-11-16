const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/services-sidebar');
// const { schemas } = require('../../models/services');

const {
  ROUTES: { services },
} = require('../constants');

router.get(services.getAll, controllerWrapper(controller.listServices));

router.post(
  services.getAll,
  //   validateBody(schemas.addServiceSchema),
  controllerWrapper(controller.addService)
);

module.exports = router;
