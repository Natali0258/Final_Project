export const OFFICER_ACTIONS = {
   ADD_TO_OFFICER: 'ADD_TO_OFFICER',
   REMOVE_FROM_OFFICER: 'REMOVE_FROM_OFFICER',
   //Запрос авторизации сотрудника
   FATCH_AUTH_OFFICER_STARTED: 'FATCH_AUTH_OFFICER_STARTED',
   FATCH_AUTH_OFFICER_SUCCESS: 'FATCH_AUTH_OFFICER_SUCCESS',
   FATCH_AUTH_OFFICER_ERROR: 'FATCH_AUTH_OFFICER_ERROR',
   //проверка валидности токена
   FATCH_TOKEN_VALIDITY_STARTED: 'FATCH_TOKEN_VALIDITY_STARTED',
   FATCH_TOKEN_VALIDITY_SUCCESS: 'FATCH_TOKEN_VALIDITY_SUCCESS',
   FATCH_TOKEN_VALIDITY_ERROR: 'FATCH_TOKEN_VALIDITY_ERROR',
   //Запрос для создания новой учетной записи
   FATCH_OFFICER_SEND_STARTED: 'FATCH_OFFICER_SEND_STARTED',
   FATCH_OFFICER_SEND_SUCCESS: 'FATCH_OFFICER_SEND_SUCCESS',
   FATCH_OFFICER_SEND_ERROR: 'FATCH_OFFICER_SEND_ERROR',
   //получение данных о сотрудниках и загрузка в таблицу
   FATCH_OFFICERS_GET_STARTED: 'FATCH_OFFICERS_GET_STARTED',
   FATCH_OFFICERS_GET_SUCCESS: 'FATCH_OFFICERS_GET_SUCCESS',
   FATCH_OFFICERS_GET_ERROR: 'FATCH_OFFICERS_GET_ERROR',
   //получение данных об одном сотруднике и загрузка в таблицу
   FATCH_OFFICER_GET_STARTED: 'FATCH_OFFICER_GET_STARTED',
   FATCH_OFFICER_GET_SUCCESS: 'FATCH_OFFICER_GET_SUCCESS',
   FATCH_OFFICER_GET_ERROR: 'FATCH_OFFICER_GET_ERROR',
   // Запрос для редактирования данных о сотруднике
   FATCH_OFFICER_EDIT_STARTED: 'FATCH_OFFICER_EDIT_STARTED',
   FATCH_OFFICER_EDIT_SUCCESS: 'FATCH_OFFICER_EDIT_SUCCESS',
   FATCH_OFFICER_EDIT_ERROR: 'FATCH_OFFICER_EDIT_ERROR',
   // Запрос для удаления данных сотрудника
   FATCH_OFFICER_REMOVE_STARTED: 'FATCH_OFFICER_REMOVE_STARTED',
   FATCH_OFFICER_REMOVE_SUCCESS: 'FATCH_OFFICER_REMOVE_SUCCESS',
   FATCH_OFFICER_REMOVE_ERROR: 'FATCH_OFFICER_REMOVE_ERROR',
   //изменить статус сотрудника на "одобрен"
   ADD_TO_APPROVED_OFFICER: 'ADD_TO_APPROVED_OFFICER',
   REMOVE_FROM_APPROVED_OFFICER: 'REMOVE_FROM_APPROVED_OFFICER',
}

export const addToOfficer = (id, email, password, firstName, lastName, clientId, approved) => {
   return {
      type: OFFICER_ACTIONS.ADD_TO_OFFICER,
      payload:
      {
         id,
         email,
         password,
         firstName,
         lastName,
         clientId,
         approved,
      }
   }
}
export const removeFromOfficer = (id) => {
   return {
      type: OFFICER_ACTIONS.REMOVE_FROM_OFFICER,
      id,
   }
}

//Запрос авторизации сотрудника
export const fatchAuthOfficerStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_AUTH_OFFICER_STARTED,
   }
}
export const fatchAuthOfficerSuccess = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_AUTH_OFFICER_SUCCESS,
   }
}
export const fatchAuthOfficerError = (error) => {
   return {
      type: OFFICER_ACTIONS.FATCH_AUTH_OFFICER_ERROR,
      error,
   }
}

//Запрос для проверки валидности токена
export const fatchTokenValidityStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_TOKEN_VALIDITY_STARTED,
   }
}
export const fatchTokenValiditySuccess = (officers) => {
   return {
      type: OFFICER_ACTIONS.FATCH_TOKEN_VALIDITY_SUCCESS,
      officers,
   }
}
export const fatchTokenValidityError = (error) => {
   return {
      type: OFFICER_ACTIONS.FATCH_TOKEN_VALIDITY_ERROR,
      error,
   }
}
//Запрос для создания новой учетной записи
export const fatchOfficerSendStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_SEND_STARTED,

   }
}
export const fatchOfficerSendSuccess = (id) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_SEND_SUCCESS,
      id,
   }
}
export const fatchOfficerSendError = (id) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_SEND_ERROR,
      id,
   }
}
//получение данных о сотрудниках и загрузка в Redux
export const fatchOfficersGetStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICERS_GET_STARTED,

   }
}
export const fatchOfficersGetSuccess = (officers) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICERS_GET_SUCCESS,
      officers,
   }
}
export const fatchOfficersGetError = (error) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICERS_GET_ERROR,
      error,
   }
}

//получение данных об одном сотруднике и загрузка в Redux
export const fatchOfficerGetStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_GET_STARTED,

   }
}
export const fatchOfficerGetSuccess = (data) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_GET_SUCCESS,
      data,
   }
}
export const fatchOfficerGetError = (error) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_GET_ERROR,
      error,
   }
}

// Запрос для редактирования данных о сотруднике
export const fatchOfficerEditStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_EDIT_STARTED,

   }
}
export const fatchOfficerEditSuccess = (data) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_EDIT_SUCCESS,
      data,
   }
}
export const fatchOfficerEditError = (error) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_EDIT_ERROR,
      error,
   }
}

// Запрос для удаления данных сотрудника 
export const fatchOfficerRemoveStarted = () => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_REMOVE_STARTED,
   }
}
export const fatchOfficerRemoveSuccess = (id) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_REMOVE_SUCCESS,
      id,
   }
}
export const fatchOfficerRemoveError = (error) => {
   return {
      type: OFFICER_ACTIONS.FATCH_OFFICER_REMOVE_ERROR,
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