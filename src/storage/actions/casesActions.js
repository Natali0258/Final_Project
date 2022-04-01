export const CAS_ACTIONS = {
   ADD_TO_CAS: 'ADD_TO_CAS',
   REMOVE_FROM_CAS: 'REMOVE_FROM_CAS',
   //marked for deletion
   REMOVE_FROM_CHECKED_DELET_CAS: 'REMOVE_FROM_CHECKED_DELET_CAS', //пометить(снять пометку) случай на удаление
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

export const removeFromCheckedDeletCas = (id) => {
   return {
      type: CAS_ACTIONS.REMOVE_FROM_CHECKED_DELET_CAS,
      id,
   }
}
