const ROUTES = {
  auth: {
    baseRoute: '/api/auth',
    signUp: '/register',
    signIn: '/login',
    signOut: '/logout',
    userVerify: '/verify/:verificationToken',
  },
  user: {
    baseRoute: '/api/users',
    currentUser: '/current',
    userUpdate: 'update',
  },
  notices: {
    baseRoute: '/api/notices',
    getAll: '/',
    getByCategory: '/categories/:category',
    getById: '/:noticeId',
    addNotice: '/:categoryName',
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
