import { ACTIONS } from "./actions";

const initialState = {
   user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      clientId: 554455,
   }
}
const reduser = (state = initialState, action) => {
   switch (action.type) {
      case ACTIONS.ADD_TO_USER:
         return {
            ...state,
            user: {
               ...state.user,
               email: action.email,
               password: action.password,
               firstName: action.firstName,
               lastName: action.lastName,
            }
         }
   }
}