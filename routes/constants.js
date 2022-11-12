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
    updateUser: '/',
    updateUserAvatar: '/avatar',
  },
  pets: {
    baseRoute: '/api/pets',
    addPet: '/',
    removePet: '/:petId',
    updatePet: '/:petId',
  },
  notices: {
    baseRoute: '/api/notices',
    getAll: '/',
    getByCategory: '/categories/:category',
    getById: '/:noticeId',
    addNotice: '/',
    listUserNotices: '/user',
    updateFavorites: '/favorites/:noticeId',
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
