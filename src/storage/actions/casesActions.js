export const CAS_ACTIONS = {
   ADD_TO_CAS: 'ADD_TO_CAS',
   REMOVE_FROM_CAS: 'REMOVE_FROM_CAS',
   //marked for deletion
   REMOVE_FROM_CHECKED_DELET_CAS: 'REMOVE_FROM_CHECKED_DELET_CAS', //пометить(снять пометку) случай на удаление
   //Запрос для создания новой учетной записи
   FATCH_CASE_SEND_STARTED: 'FATCH_CASE_SEND_STARTED',
   FATCH_CASE_SEND_SUCCESS: 'FATCH_CASE_SEND_SUCCESS',
   FATCH_CASE_SEND_ERROR: 'FATCH_CASE_SEND_ERROR',
}

export const addToCas = (id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution) => {
   return {
      type: CAS_ACTIONS.ADD_TO_CAS,
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

export const removeFromCas = (id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution, checkedDelet) => {
   return {
      type: CAS_ACTIONS.REMOVE_FROM_CAS,
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
         checkedDelet,

      }
   }
}

//Запрос для создания нового сообщения о краже 
//(доступен только авторизованным пользователям)
export const fatchCaseSendStarted = () => {
   return {
      type: CAS_ACTIONS.FATCH_CASE_SEND_STARTED,
   }
}
export const fatchCaseSendSuccess = (id) => {
   return {
      type: CAS_ACTIONS.FATCH_CASE_SEND_SUCCESS,
      id,
   }
}
export const fatchCaseSendError = (id) => {
   return {
      type: CAS_ACTIONS.FATCH_CASE_SEND_ERROR,
      id,
   }
}
