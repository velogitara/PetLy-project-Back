const ROUTES = {
  auth: {
    baseRoute: '/api/auth',
    signUp: '/register',
    signIn: '/login',
    signOut: '/logout',
    userVerify: '/verify/:verificationToken',
    userDelete: '/delete',
  },
  users: {
    baseRoute: '/api/users',
    getCurrentUser: '/current',
    updateUser: '/updateUserInfo',
    updateUserAvatar: '/updateUserAvatar',
    addPet: '/addPet',
    removePet: '/removePet',
    updatePet: '/updatePetInfo',
  },
  notices: {
    baseRoute: '/api/notices',
    getAll: '/',
    getByCategory: '/categories/:category',
    getById: '/:noticeId',
    getByQuery: '/search/:query',
    addNotice: '/',
    listUserNotices: '/user',
    updateFavorite: '/favorite/:noticeId',
    updateNotice: '/:noticeId',
    removeNotice: '/:noticeId',
  },
  news: {
    baseRoute: '/api/news',
    getAll: '/',
  },
  services: {
    baseRoute: '/api/services',
    getAll: '/',
  },
};

module.exports = { ROUTES };
