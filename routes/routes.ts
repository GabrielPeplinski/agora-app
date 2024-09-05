const apiRoutes = {
  auth: {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
    me: 'auth/me',
    personalData: 'auth/personal-data'
  },
  address: {
    get: 'client/address',
  },
  solicitationCategory: {
    get: 'selects/solicitation-categories',
  },
  mySolicitations: {
    index: 'client/my-solicitations',
    addImage: 'client/my-solicitations/:id/add-image'
  },
  solicitations: {
    index: 'solicitations',
    like: 'client/solicitations/like',
  }
}

export default apiRoutes;