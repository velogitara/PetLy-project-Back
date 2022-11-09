const ROUTES = {
  auth: {
    baseRoute: '/api/users',
    signUp: '/register',
    signIn: '/login',
    signOut: 'logout',
    currentUser: '/current',
    userVerify: '/verify/:verificationToken',
    userUpdate: 'update',
  },
  notices: {
    baseRoute: '/api/notices',
    getAll: '/',
    getById: '/noticeId',
    addNotice: '/',
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
