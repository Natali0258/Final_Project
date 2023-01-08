export const AUTH_ACTIONS = {
   //Вызов окна авторизации
   GET_AUTHORIZATION: 'GET_AUTHORIZATION',
   //Закрытие окна авторизации
   CLOSE_AUTHORIZATION: 'CLOSE_AUTHORIZATION',
   //Вывод сообщения о результате авторизации
   RESULT_AUTHORIZATION: 'RESULT_AUTHORIZATION',
   //Закрытие сообщения о результате авторизации
   CLOSE_RESULT_AUTHORIZATION: 'CLOSE_RESULT_AUTHORIZATION',
   //Запрос для создания новой учетной записи
   FETCH_AUTH_STARTED: 'FETCH_AUTH_STARTED',
   FETCH_AUTH_SUCCESS: 'FETCH_AUTH_SUCCESS',
   FETCH_AUTH_ERROR: 'FETCH_AUTH_ERROR',
   //Вызов бургер-меню
   GET_BURGERMENU: 'GET_BURGERMENU',
   //Закрытие бургер-меню
   CLOSE_BURGERMENU: 'CLOSE_BURGERMENU',
   //Выход
   OUTPUT: 'OUTPUT',
   //Ошибка из-за прекращения времени действия токена
   TOKEN_ERROR: 'TOKEN_ERROR,'
}

//Вызов окна авторизации
export const getAuthorization = () => {
   return {
      type: AUTH_ACTIONS.GET_AUTHORIZATION
   }
}

//Закрытие окна авторизации
export const closeAuthorization = () => {
   return {
      type: AUTH_ACTIONS.CLOSE_AUTHORIZATION
   }
}

//Вывод сообщения о результате авторизации
export const resultAuthorization = () => {
   return {
      type: AUTH_ACTIONS.RESULT_AUTHORIZATION
   }
}

//Закрытие сообщения о результате авторизации
export const closeResultAuthorization = () => {
   return {
      type: AUTH_ACTIONS.CLOSE_RESULT_AUTHORIZATION
   }
}

//Запрос для создания новой учетной записи
export const fetchAuthStarted = () => {
   return {
      type: AUTH_ACTIONS.FETCH_AUTH_STARTED,

   }
}
export const fetchAuthSuccess = (email, password, clientId) => {
   return {
      type: AUTH_ACTIONS.FETCH_AUTH_SUCCESS,
      data: {
         email, password, clientId
      }
   }
}
export const fetchAuthError = (id) => {
   return {
      type: AUTH_ACTIONS.FETCH_AUTH_ERROR,
      id,
   }
}

//Вызов бургер-меню
export const getBurgerMenu = () => {
   return {
      type: AUTH_ACTIONS.GET_BURGERMENU,
   }
}

//Закрытие бургер-меню
export const closeBurgerMenu = () => {
   return {
      type: AUTH_ACTIONS.CLOSE_BURGERMENU,
   }
}

//Выход
export const output = () => {
   return {
      type: AUTH_ACTIONS.OUTPUT
   }
}
//Ошибка из-за прекращения времени действия токена
export const tokenError = () => {
   return {
      type: AUTH_ACTIONS.TOKEN_ERROR
   }
}