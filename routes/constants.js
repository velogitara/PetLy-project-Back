const ROUTES = {
  auth: {
    baseRoute: '/api/auth',
    signUp: '/register',
    signIn: '/login',
    signOut: '/logout',
    refresh: '/refresh',
    userVerify: '/verify/:verificationToken',
    userDelete: '/delete',
  },
  users: {
    baseRoute: '/api/users',
    getCurrentUser: '/',
    updateUser: '/updateUserInfo',
    addPet: '/addPet',
    removePet: '/removePet/:petId',
    updatePet: '/updatePetInfo/:petId',
  },
  notices: {
    baseRoute: '/api/notices',
    listNotices: '/',
    listNoticesByCategory: '/categories/:category',
    getNoticeById: '/:noticeId',
    listNoticesByQuery: '/',
    addNotice: '/',
    listUserNotices: '/own',
    updateFavorites: '/favorites/:noticeId',
    updateNotice: '/:noticeId',
    removeNotice: '/:noticeId',
  },
  news: {
    baseRoute: '/api/news',
    listNews: '/',
    addNews: '/',
  },
  friends: {
    baseRoute: '/api/friends',
    listFriends: '/',
  },
};

module.exports = { ROUTES };
