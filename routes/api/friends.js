const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controller = require('../../controllers/friends-sidebar');

const {
  ROUTES: { friends },
} = require('../constants');

router.get(friends.listFriends, controllerWrapper(controller.listFriends));

module.exports = router;
