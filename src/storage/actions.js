export const ACTIONS = {
   ADD_TO_OFFICER: 'ADD_TO_OFFICER',
   REMOVE_FROM_OFFICER: 'REMOVE_FROM_OFFICER',
   ADD_TO_CHECKED_DELETE_OFFICER: 'ADD_TO_CHECKED_DELETE_OFFICER', //пометить сотрудника на удаление
   REMOVE_FROM_CHECKED_DELETE_OFFICER: 'REMOVE_FROM_CHECKED_DELETE_OFFICER',//снять отметку с сотрудника на удаление
   ADD_TO_APPROVED_OFFICER: 'ADD_TO_APPROVED_OFFICER', //изменить статус сотрудника на "одобрен"
   REMOVE_FROM_APPROVED_OFFICER: 'REMOVE_FROM_APPROVED_OFFICER',
   ADD_TO_CASE: 'ADD_TO_CASE',
   REMOVE_FROM_CASE: 'REMOVE_FROM_CASE',
   ADD_TO_CHECKED_DELETE_OFFICER: 'ADD_TO_CHECKED_DELETE_CASE', //пометить случай на удаление
   REMOVE_FROM_CHECKED_DELETE_OFFICER: 'REMOVE_FROM_CHECKED_DELETE_CASE', //снять отметку с случая на удаление


}

export const addToOfficer = { id } => {
   return {
      type: ACTIONS.ADD_TO_OFFICER,
      id, email, password, firstName, lastName,
   }
}

export const removeFromOfficer = { id } => {
   return {
      type: ACTIONS.REMOVE_FROM_OFFICER,
      id,
      email,
      password,
      firstName,
      lastName,
   }
}

export const addToCheckedDeleteOfficer = { id } => {
   return {
      type: ACTIONS.ADD_TO_CHECKED_DELETE_OFFICER,
      id,
   }
}

export const removeFromCheckedDeleteOfficer = { id } => {
   return {
      type: ACTIONS.REMOVE_FROM_CHECKED_DELETE_OFFICER,
      id,
   }
}

export const addToApprovedOfficer = { id } => {
   return {
      type: ACTIONS.ADD_TO_APPROVED_OFFICER,
      id,
      approved,
   }
}

export const removeFromApprovedOfficer = { id } => {
   return {
      type: ACTIONS.REMOVE_FROM_APPROVED_OFFICER,
      id,
      approved,
   }
}

export const addToCase = { id } => {
   return {
      type: ACTIONS.ADD_TO_CASE,
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

export const removeFromCase = { id } => {
   return {
      type: ACTIONS.REMOVE_FROM_CASE,
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

export const addToCheckedDeleteCase = { id } => {
   return {
      type: ACTIONS.ADD_TO_CHECKED_DELETE_CASE,
      id,
   }
}

export const removeFromCheckedDeleteCase = { id } => {
   return {
      type: ACTIONS.REMOVE_FROM_CHECKED_DELETE_CASE,
      id,
   }
}

