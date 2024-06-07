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
  mySolicitations: {
    index: 'client/my-solicitations',
    addImage: 'my-solicitations/:id/add-image'
  },
  solicitation: {
    like: 'client/solicitations/like',
  }
}

export default apiRoutes;