import { ACTIONS } from "./actions";

const initialState = {
   officer: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      clientId: 554455,
   }
}
const reduser = (state = initialState, action) => {
   switch (action.type) {
      case ACTIONS.ADD_TO_OFFICER:
         return {
            ...state,
            officer: {
               ...state.officer,
               email: action.email,
               password: action.password,
               firstName: action.firstName,
               lastName: action.lastName,
            }
         }
      case ACTIONS.REMOVE_FROM_OFFICER:
         return {
            ...state,
            officers: state.officers.filter(officer => {
               officer.id === action.officer.id
            })
         }
      case ACTIONS.ADD_TO_CHECKED_DELETE_OFFICER:
         return {

         }
      default: return state
   }
}