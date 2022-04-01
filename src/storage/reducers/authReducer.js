import { AUTH_ACTIONS } from "../actions/autActions";

const initialState = {
   email: null,
   password: null,
   clientId: null,
   isAuth: false,
}
const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case AUTH_ACTIONS.SET_USER_DATA:
         return {
            ...state,
            ...action.data,
            isAuth: true,
         };
      default: return state;
   }
}
export default authReducer; 