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
    get: 'select/solicitation-categories',
  }
}

export default apiRoutes;