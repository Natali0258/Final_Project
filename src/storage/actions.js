export const ACTIONS = {
   ADD_TO_USER: 'ADD_TO_USER',

}

export const addToUsers = { id } => {
   return {
      type: ACTIONS.ADD_TO_USER,
      id, email, password, firstName, lastName,
   }
}