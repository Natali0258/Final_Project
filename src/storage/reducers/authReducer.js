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
   isError: false,
   isAuthResult: false,
   error: null,
}
const authReducer = (state = initialState, action) => {
   switch (action.type) {
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

      //Вывод сообщения о результате авторизации
      case AUTH_ACTIONS.RESULT_AUTHORIZATION:
         return {
            ...state,
            isAuthResult: true,
         }

      //Закрытие сообщения о результате авторизации
      case AUTH_ACTIONS.CLOSE_RESULT_AUTHORIZATION:
         return {
            ...state,
            isAuthResult: false,
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
            isAuthResult: true,
            isLoading: false,
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
         localStorage.removeItem('token');
         return {
            ...state,
            isAuth: false,
            isAuthorization: false,
            isAuthResult: false,
            error: null,
         }
      //Ошибка из-за прекращения времени действия токена
      case AUTH_ACTIONS.TOKEN_ERROR:
         return {
            ...state,
            isAuth: false,
            isAuthorization: false,
            isError: true,
            error: null,
         }


      default: return state;
   }
}
export default authReducer; 