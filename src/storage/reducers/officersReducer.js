import { OFFICER_ACTIONS } from '../actions/officerActions';

const initialState = {
   officers: []
}
const officersReducer = (state = initialState, action) => {
   switch (action.type) {
      case OFFICER_ACTIONS.ADD_TO_OFFICER:
         return {
            ...state,
            officers: [...state.officers,
            {
               id: action.id,
               email: action.email,
               password: action.password,
               firstName: action.firstName,
               lastName: action.lastName,
               clientId: action.clientId,
               approved: action.approved,
            }]
         }
      case OFFICER_ACTIONS.REMOVE_FROM_OFFICER:
         return {
            ...state,
            officers: state.officers.filter(officer =>
               officer.id !== action.officer.id
            )
         }
      default: return state
   }
}
export default officersReducer;