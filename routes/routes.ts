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
    addImage: 'client/my-solicitations/:id/add-image',
    removeImages: 'client/my-solicitations/:id/remove-images',
  },
  solicitations: {
    index: 'solicitations',
    like: 'client/solicitations/like',
  },
  userSolicitations: {
    addImage: 'client/my-user-solicitations/:id/add-image',
  }
}

export default apiRoutes;