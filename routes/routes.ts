const apiRoutes = {
  auth: {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
    me: 'auth/me'
  },
  address: {
    get: 'client/address',
  },
  solicitationCategory: {
    get: 'selects/solicitation-categories',
  },
  solicitation: {
    like: 'client/solicitations/like',
  }
}

export default apiRoutes;