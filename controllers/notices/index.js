const listNotices = require('./listNotices');
const getNoticeById = require('./getNoticeById');
const listNoticesByCategory = require('./listNoticesByCategory');
const addNotice = require('./addNotice');
const listUserNotices = require('./listUserNotices');
const updateFavorites = require('./updateFavorites');
const removeNotice = require('./removeNotice');
const listNoticeByQuery = require('./listNoticeByQuery');

module.exports = {
  listNotices,
  listNoticesByCategory,
  getNoticeById,
  listUserNotices,
  addNotice,
  updateFavorites,
  removeNotice,
  listNoticeByQuery,
};
