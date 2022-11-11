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
    currentUser: '/current',
    updateUser: '/updateUserInfo',
    addPet: '/addPet',
    removePet: '/removePet',
    updatePet: '/updatePetInfo',
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
