const listNotices = require('./listNotices');
const getNoticeById = require('./getNoticeById');
const listNoticesByCategory = require('./listNoticesByCategory');
const addNotice = require('./addNotice');
const listUserNotices = require('./listUserNotices');
const updateFavorite = require('./updateFavorite');
const getNoticeByQuery = require('./getNoticeByQuery');

module.exports = {
  listNotices,
  listNoticesByCategory,
  getNoticeById,
  listUserNotices,
  addNotice,
  updateFavorite,
  getNoticeByQuery,
};
