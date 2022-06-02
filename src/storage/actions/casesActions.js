export const CASE_ACTIONS = {
   ADD_TO_CASE: 'ADD_TO_CASE',
   REMOVE_FROM_CASE: 'REMOVE_FROM_CASE',
   //marked for deletion
   REMOVE_FROM_CHECKED_DELET_CASE: 'REMOVE_FROM_CHECKED_DELET_CASE', //пометить(снять пометку) случай на удаление
   //Запрос для создания новой учетной записи
   FATCH_CASE_SEND_STARTED: 'FATCH_CASE_SEND_STARTED',
   FATCH_CASE_SEND_SUCCESS: 'FATCH_CASE_SEND_SUCCESS',
   FATCH_CASE_SEND_ERROR: 'FATCH_CASE_SEND_ERROR',
   //Запрос для получения всех сообщений о краже
   FATCH_CASES_GET_STARTED: 'FATCH_CASES_GET_STARTED',
   FATCH_CASES_GET_SUCCESS: 'FATCH_CASES_GET_SUCCESS',
   FATCH_CASES_GET_ERROR: 'FATCH_CASES_GET_ERROR',
   //DEL Запрос для удаления сообщения о краже
   FATCH_CASE_REMOVE_STARTED: 'FATCH_CASE_REMOVE_STARTED',
   FATCH_CASE_REMOVE_SUCCESS: 'FATCH_CASE_REMOVE_SUCCESS',
   FATCH_CASE_REMOVE_ERROR: 'FATCH_CASE_REMOVE_ERROR',
   //GET Запрос для получения данных одного сообщения о краже
   FATCH_CASE_GET_STARTED: 'FATCH_CASE_GET_STARTED',
   FATCH_CASE_GET_SUCCESS: 'FATCH_CASE_GET_SUCCESS',
   FATCH_CASE_GET_ERROR: 'FATCH_CASE_GET_ERROR',
   //PUT Запрос для редактирования сообщения о краже
   FATCH_CASE_EDIT_STARTED: 'FATCH_CASE_EDIT_STARTED',
   FATCH_CASE_EDIT_SUCCESS: 'FATCH_CASE_EDIT_SUCCESS',
   FATCH_CASE_EDIT_ERROR: 'FATCH_CASE_EDIT_ERROR',
}

export const addToCase = (id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution) => {
   return {
      type: CASE_ACTIONS.ADD_TO_CASE,
      payload: {
         id,
         status,
         licenseNumber,
         type,
         ownerFullName,
         clientId,
         createdAd,
         updatedAd,
         color,
         date,
         officer,
         description,
         resolution,
      }
   }
}

export const removeFromCase = (id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution) => {
   return {
      type: CASE_ACTIONS.REMOVE_FROM_CASE,
      payload: {
         id,
         status,
         licenseNumber,
         type,
         ownerFullName,
         clientId,
         createdAd,
         updatedAd,
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
export const fatchCaseSendStarted = () => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_SEND_STARTED,
   }
}
export const fatchCaseSendSuccess = (id) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_SEND_SUCCESS,
      id,
   }
}
export const fatchCaseSendError = (error) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_SEND_ERROR,
      error,
   }
}

//Запрос для получения всех сообщений о краже
export const fatchCasesGetStarted = () => {
   return {
      type: CASE_ACTIONS.FATCH_CASES_GET_STARTED,
   }
}
export const fatchCasesGetSuccess = (data) => {
   return {
      type: CASE_ACTIONS.FATCH_CASES_GET_SUCCESS,
      data,
   }
}
export const fatchCasesGetError = (error) => {
   return {
      type: CASE_ACTIONS.FATCH_CASES_GET_ERROR,
      error,
   }
}

//DEL Запрос для удаления сообщения о краже
export const fatchCaseRemoveStarted = () => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_REMOVE_STARTED,
   }
}
export const fatchCaseRemoveSuccess = (id) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_REMOVE_SUCCESS,
      id,
   }
}
export const fatchCaseRemoveError = (error) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_REMOVE_ERROR,
      error,
   }
}

//GET Запрос для получения данных одного сообщения о краже
export const fatchCaseGetStarted = () => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_GET_STARTED,
   }
}
export const fatchCaseGetSuccess = (data) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_GET_SUCCESS,
      data,
   }
}
export const fatchCaseGetError = (error) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_GET_ERROR,
      error,
   }
}

//PUT Запрос для редактирования сообщения о краже
export const fatchCaseEditStarted = () => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_EDIT_STARTED,
   }
}
export const fatchCaseEditSuccess = (data) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_EDIT_SUCCESS,
      data,
   }
}
export const fatchCaseEditError = (error) => {
   return {
      type: CASE_ACTIONS.FATCH_CASE_EDIT_ERROR,
      error,
   }
}