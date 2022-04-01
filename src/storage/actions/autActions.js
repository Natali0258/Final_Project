export const AUTH_ACTIONS = {
   SET_USER_DATA: 'SET_USER_DATA',
}

export const setUserData = (email, password, clientId) => {
   return {
      type: AUTH_ACTIONS.SET_USER_DATA,
      data: {
         email, password, clientId
      }
   }
}