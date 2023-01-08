export const CASE_ACTIONS = {
   ADD_TO_CASE: 'ADD_TO_CASE',
   REMOVE_FROM_CASE: 'REMOVE_FROM_CASE',
   //marked for deletion
   REMOVE_FROM_CHECKED_DELET_CASE: 'REMOVE_FROM_CHECKED_DELET_CASE', //пометить(снять пометку) случай на удаление
   //Запрос для создания новой учетной записи
   FETCH_CASE_SEND_STARTED: 'FETCH_CASE_SEND_STARTED',
   FETCH_CASE_SEND_SUCCESS: 'FETCH_CASE_SEND_SUCCESS',
   FETCH_CASE_SEND_ERROR: 'FETCH_CASE_SEND_ERROR',
   //Запрос для получения всех сообщений о краже
   FETCH_CASES_GET_STARTED: 'FETCH_CASES_GET_STARTED',
   FETCH_CASES_GET_SUCCESS: 'FETCH_CASES_GET_SUCCESS',
   FETCH_CASES_GET_ERROR: 'FETCH_CASES_GET_ERROR',
   //DEL Запрос для удаления сообщения о краже
   FETCH_CASE_REMOVE_STARTED: 'FETCH_CASE_REMOVE_STARTED',
   FETCH_CASE_REMOVE_SUCCESS: 'FETCH_CASE_REMOVE_SUCCESS',
   FETCH_CASE_REMOVE_ERROR: 'FETCH_CASE_REMOVE_ERROR',
   //GET Запрос для получения данных одного сообщения о краже
   FETCH_CASE_GET_STARTED: 'FETCH_CASE_GET_STARTED',
   FETCH_CASE_GET_SUCCESS: 'FETCH_CASE_GET_SUCCESS',
   FETCH_CASE_GET_ERROR: 'FETCH_CASE_GET_ERROR',
   //PUT Запрос для редактирования сообщения о краже
   FETCH_CASE_EDIT_STARTED: 'FETCH_CASE_EDIT_STARTED',
   FETCH_CASE_EDIT_SUCCESS: 'FETCH_CASE_EDIT_SUCCESS',
   FETCH_CASE_EDIT_ERROR: 'FETCH_CASE_EDIT_ERROR',
}

export const addToCase = (id, status, licenseNumber, type, ownerFullName, clientId, createdAt, updatedAt, color, date, officer, description, resolution) => {
   return {
      type: CASE_ACTIONS.ADD_TO_CASE,
      payload: {
         id,
         status,
         licenseNumber,
         type,
         ownerFullName,
         clientId,
         createdAt,
         updatedAt,
         color,
         date,
         officer,
         description,
         resolution,
      }
   }
}

export const removeFromCase = (id, status, licenseNumber, type, ownerFullName, clientId, createdAt, updatedAt, color, date, officer, description, resolution) => {
   return {
      type: CASE_ACTIONS.REMOVE_FROM_CASE,
      payload: {
         id,
         status,
         licenseNumber,
         type,
         ownerFullName,
         clientId,
         createdAt,
         updatedAt,
         color,
         date,
         officer,
         description,
         resolution,
      }
   }
}

//Запрос для создания нового сообщения о краже 
//(доступен только авторизованным пользователям)
export const fetchCaseSendStarted = () => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_SEND_STARTED,
   }
}
export const fetchCaseSendSuccess = (id) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_SEND_SUCCESS,
      id,
   }
}
export const fetchCaseSendError = (error) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_SEND_ERROR,
      error,
   }
}

//Запрос для получения всех сообщений о краже
export const fetchCasesGetStarted = () => {
   return {
      type: CASE_ACTIONS.FETCH_CASES_GET_STARTED,
   }
}
export const fetchCasesGetSuccess = (data) => {
   return {
      type: CASE_ACTIONS.FETCH_CASES_GET_SUCCESS,
      data,
   }
}
export const fetchCasesGetError = (error) => {
   return {
      type: CASE_ACTIONS.FETCH_CASES_GET_ERROR,
      error,
   }
}

//DEL Запрос для удаления сообщения о краже
export const fetchCaseRemoveStarted = () => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_REMOVE_STARTED,
   }
}
export const fetchCaseRemoveSuccess = (id) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_REMOVE_SUCCESS,
      id,
   }
}
export const fetchCaseRemoveError = (error) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_REMOVE_ERROR,
      error,
   }
}

//GET Запрос для получения данных одного сообщения о краже
export const fetchCaseGetStarted = () => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_GET_STARTED,
   }
}
export const fetchCaseGetSuccess = (data) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_GET_SUCCESS,
      data,
   }
}
export const fetchCaseGetError = (error) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_GET_ERROR,
      error,
   }
}

//PUT Запрос для редактирования сообщения о краже
export const fetchCaseEditStarted = () => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_EDIT_STARTED,
   }
}
export const fetchCaseEditSuccess = (data) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_EDIT_SUCCESS,
      data,
   }
}
export const fetchCaseEditError = (error) => {
   return {
      type: CASE_ACTIONS.FETCH_CASE_EDIT_ERROR,
      error,
   }
}