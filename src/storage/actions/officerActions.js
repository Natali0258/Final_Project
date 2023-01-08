export const OFFICER_ACTIONS = {
   //Удаление данных о сотруднике
   REMOVE_FROM_OFFICER: 'REMOVE_FROM_OFFICER',
   //Вызов модального окна
   GET_MODAL: 'GET_MODAL',
   //Закрытие модального окна
   CLOSE_MODAL: 'CLOSE_MODAL',
   //Вызов окна регистрации
   GET_REGISTRATION: 'GET_REGISTRATION',
   //Закрытие окна регистрации
   CLOSE_REGISTRATION: 'CLOSE_REGISTRATION',
   //Вывод сообщения о результате регистрации
   RESULT_REGISTRATION: 'RESULT_REGISTRATION',
   //Закрыть сообщение о результате регистрации
   CLOSE_RESULT_REGISTRATION: 'CLOSE_RESULT_REGISTRATION',
   //проверка валидности токена
   FETCH_TOKEN_VALIDITY_STARTED: 'FETCH_TOKEN_VALIDITY_STARTED',
   FETCH_TOKEN_VALIDITY_SUCCESS: 'FETCH_TOKEN_VALIDITY_SUCCESS',
   FETCH_TOKEN_VALIDITY_ERROR: 'FETCH_TOKEN_VALIDITY_ERROR',
   //Запрос для создания новой учетной записи
   FETCH_OFFICER_SEND_STARTED: 'FETCH_OFFICER_SEND_STARTED',
   FETCH_OFFICER_SEND_SUCCESS: 'FETCH_OFFICER_SEND_SUCCESS',
   FETCH_OFFICER_SEND_ERROR: 'FETCH_OFFICER_SEND_ERROR',
   //получение данных о сотрудниках и загрузка в таблицу
   FETCH_OFFICERS_GET_STARTED: 'FETCH_OFFICERS_GET_STARTED',
   FETCH_OFFICERS_GET_SUCCESS: 'FETCH_OFFICERS_GET_SUCCESS',
   FETCH_OFFICERS_GET_ERROR: 'FETCH_OFFICERS_GET_ERROR',
   //получение данных об одном сотруднике и загрузка в таблицу
   FETCH_OFFICER_GET_STARTED: 'FETCH_OFFICER_GET_STARTED',
   FETCH_OFFICER_GET_SUCCESS: 'FETCH_OFFICER_GET_SUCCESS',
   FETCH_OFFICER_GET_ERROR: 'FETCH_OFFICER_GET_ERROR',
   // Запрос для редактирования данных о сотруднике
   FETCH_OFFICER_EDIT_STARTED: 'FETCH_OFFICER_EDIT_STARTED',
   FETCH_OFFICER_EDIT_SUCCESS: 'FETCH_OFFICER_EDIT_SUCCESS',
   FETCH_OFFICER_EDIT_ERROR: 'FETCH_OFFICER_EDIT_ERROR',
   // Запрос для удаления данных сотрудника
   FETCH_OFFICER_REMOVE_STARTED: 'FETCH_OFFICER_REMOVE_STARTED',
   FETCH_OFFICER_REMOVE_SUCCESS: 'FETCH_OFFICER_REMOVE_SUCCESS',
   FETCH_OFFICER_REMOVE_ERROR: 'FETCH_OFFICER_REMOVE_ERROR',
   //изменить статус сотрудника на "одобрен"
   ADD_TO_APPROVED_OFFICER: 'ADD_TO_APPROVED_OFFICER',
   REMOVE_FROM_APPROVED_OFFICER: 'REMOVE_FROM_APPROVED_OFFICER',
}

export const removeFromOfficer = (id) => {
   return {
      type: OFFICER_ACTIONS.REMOVE_FROM_OFFICER,
      id,
   }
}

//Вызов модального окна
export const getModal = () => {
   return {
      type: OFFICER_ACTIONS.GET_MODAL
   }
}
//Закрытие модального окна
export const closeModal = () => {
   return {
      type: OFFICER_ACTIONS.CLOSE_MODAL
   }
}

//Вызов окна регистрации
export const getRegistration = () => {
   return {
      type: OFFICER_ACTIONS.GET_REGISTRATION
   }
}

//Закрытие окна регистрации
export const closeRegistration = () => {
   return {
      type: OFFICER_ACTIONS.CLOSE_REGISTRATION
   }
}

//Вывод сообщения о результате регистрации
export const resultRegistration = () => {
   return {
      type: OFFICER_ACTIONS.RESULT_REGISTRATION
   }
}

//Закрыть сообщение о результате регистрации
export const closeResultRegistration = () => {
   return {
      type: OFFICER_ACTIONS.CLOSE_RESULT_REGISTRATION
   }
}

//Запрос для проверки валидности токена
export const fetchTokenValidityStarted = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_TOKEN_VALIDITY_STARTED,
   }
}
export const fetchTokenValiditySuccess = (officers) => {
   return {
      type: OFFICER_ACTIONS.FETCH_TOKEN_VALIDITY_SUCCESS,
      officers,
   }
}
export const fetchTokenValidityError = (error) => {
   return {
      type: OFFICER_ACTIONS.FETCH_TOKEN_VALIDITY_ERROR,
      error,
   }
}
//Запрос для создания новой учетной записи
export const fetchOfficerSendStarted = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_SEND_STARTED,

   }
}
export const fetchOfficerSendSuccess = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_SEND_SUCCESS,
   }
}
export const fetchOfficerSendError = (Error) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_SEND_ERROR,
      Error,
   }
}
//получение данных о сотрудниках и загрузка в Redux
export const fetchOfficersGetStarted = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICERS_GET_STARTED,

   }
}
export const fetchOfficersGetSuccess = (officers) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICERS_GET_SUCCESS,
      officers,
   }
}
export const fetchOfficersGetError = (error) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICERS_GET_ERROR,
      error,
   }
}

//получение данных об одном сотруднике и загрузка в Redux
export const fetchOfficerGetStarted = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_GET_STARTED,

   }
}
export const fetchOfficerGetSuccess = (data) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_GET_SUCCESS,
      data,
   }
}
export const fetchOfficerGetError = (error) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_GET_ERROR,
      error,
   }
}

// Запрос для редактирования данных о сотруднике
export const fetchOfficerEditStarted = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_EDIT_STARTED,

   }
}
export const fetchOfficerEditSuccess = (data) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_EDIT_SUCCESS,
      data,
   }
}
export const fetchOfficerEditError = (error) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_EDIT_ERROR,
      error,
   }
}

// Запрос для удаления данных сотрудника 
export const fetchOfficerRemoveStarted = () => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_REMOVE_STARTED,
   }
}
export const fetchOfficerRemoveSuccess = (id) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_REMOVE_SUCCESS,
      id,
   }
}
export const fetchOfficerRemoveError = (error) => {
   return {
      type: OFFICER_ACTIONS.FETCH_OFFICER_REMOVE_ERROR,
      error,
   }
}

export const addToApprovedOfficer = (id, approved) => {
   return {
      type: OFFICER_ACTIONS.ADD_TO_APPROVED_OFFICER,
      id,
      approved,
   }
}

export const removeFromApprovedOfficer = (id, approved) => {
   return {
      type: OFFICER_ACTIONS.REMOVE_FROM_APPROVED_OFFICER,
      id,
      approved,
   }
}