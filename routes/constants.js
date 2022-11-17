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
    getCurrentUser: '/',
    updateUser: '/updateUserInfo',
    addPet: '/addPet',
    removePet: '/removePet/:petId',
    updatePet: '/updatePetInfo/:petId',
  },
  notices: {
    baseRoute: '/api/notices',
    getAll: '/',
    getByCategory: '/categories/:category',
    getById: '/:noticeId',
    getByQuery: '/search/:query',
    addNotice: '/',
    listUserNotices: '/user',
    updateFavorites: '/favorites/:noticeId',
    updateNotice: '/:noticeId',
    removeNotice: '/:noticeId',
  },
  news: {
    baseRoute: '/api/news',
    getAll: '/',
    getByQuery: '/search/:query',
  },
  friends: {
    baseRoute: '/api/friends',
    getAll: '/',
  },
};

module.exports = { ROUTES };
