import { AUTH_ACTIONS } from "../actions/authActions";

const initialState = {
   email: null,
   password: null,
   clientId: null,
   isAuth: false,
   isAuthorization: false,
   isLoading: false,
   isLogged: false, //флаг для сообщения приветствия пользователя
   isBurgerMenu: false,
   error: null,
}
const authReducer = (state = initialState, action) => {
   switch (action.type) {
      // case AUTH_ACTIONS.SET_USER_DATA:
      //    return {
      //       ...state,
      //       ...action.data,
      //       isAuth: true,
      //    };

      //Вызов окна авторизации
      case AUTH_ACTIONS.GET_AUTHORIZATION:
         return {
            ...state,
            isAuthorization: true,
         }

      //Закрытие окна авторизации
      case AUTH_ACTIONS.CLOSE_AUTHORIZATION:
         return {
            ...state,
            isAuthorization: false,
         }

      //Запрос авторизации сотрудника
      case AUTH_ACTIONS.FETCH_AUTH_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case AUTH_ACTIONS.FETCH_AUTH_SUCCESS:
         return {
            ...state,
            ...action.data,
            isAuth: true,
            isLoading: false,
            // isLogged: true,
            error: null,
         }
      case AUTH_ACTIONS.FETCH_AUTH_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      //Вызов бургер-меню
      case AUTH_ACTIONS.GET_BURGERMENU:
         return {
            ...state,
            isBurgerMenu: true,
         }

      //Закрытие бургер-меню
      case AUTH_ACTIONS.CLOSE_BURGERMENU:
         return {
            ...state,
            isBurgerMenu: false,
         }
      //Выход
      case AUTH_ACTIONS.OUTPUT:
         return {
            ...state,
            isAuth: false,
            isAuthorization: false,
            error: null,
         }

      default: return state;
   }
}
export default authReducer; 