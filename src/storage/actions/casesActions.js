export const CASE_ACTIONS = {
   ADD_TO_CASE: 'ADD_TO_CASE',
   REMOVE_FROM_CASE: 'REMOVE_FROM_CASE',
   ADD_TO_CHECKED_DELETE_OFFICER: 'ADD_TO_CHECKED_DELETE_CASE', //пометить случай на удаление
   REMOVE_FROM_CHECKED_DELETE_OFFICER: 'REMOVE_FROM_CHECKED_DELETE_CASE', //снять отметку с случая на удаление
}

export const addToCase = (id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution) => {
   return {
      type: CASE_ACTIONS.ADD_TO_CASE,
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

export const removeFromCase = (id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution) => {
   return {
      type: CASE_ACTIONS.REMOVE_FROM_CASE,
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

export const addToCheckedDeleteCase = (id) => {
   return {
      type: CASE_ACTIONS.ADD_TO_CHECKED_DELETE_CASE,
      id,
   }
}

export const removeFromCheckedDeleteCase = (id) => {
   return {
      type: CASE_ACTIONS.REMOVE_FROM_CHECKED_DELETE_CASE,
      id,
   }
}
