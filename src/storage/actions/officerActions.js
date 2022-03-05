export const OFFICER_ACTIONS = {
   ADD_TO_OFFICER: 'ADD_TO_OFFICER',
   REMOVE_FROM_OFFICER: 'REMOVE_FROM_OFFICER',
   ADD_TO_CHECKED_DELETE_OFFICER: 'ADD_TO_CHECKED_DELETE_OFFICER', //пометить сотрудника на удаление
   REMOVE_FROM_CHECKED_DELETE_OFFICER: 'REMOVE_FROM_CHECKED_DELETE_OFFICER',//снять отметку с сотрудника на удаление
   ADD_TO_APPROVED_OFFICER: 'ADD_TO_APPROVED_OFFICER', //изменить статус сотрудника на "одобрен"
   REMOVE_FROM_APPROVED_OFFICER: 'REMOVE_FROM_APPROVED_OFFICER',
}

export const addToOfficer = (id, email, password, firstName, lastName, clientId, approved) => {
   return {
      type: OFFICER_ACTIONS.ADD_TO_OFFICER,
      id, email, password, firstName, lastName, clientId, approved,
   }
}
export const removeFromOfficer = (id) => {
   return {
      type: OFFICER_ACTIONS.REMOVE_FROM_OFFICER,
      id,
   }
}
export const addToCheckedDeleteOfficer = (id) => {
   return {
      type: OFFICER_ACTIONS.ADD_TO_CHECKED_DELETE_OFFICER,
      id,
   }
}

export const removeFromCheckedDeleteOfficer = (id) => {
   return {
      type: OFFICER_ACTIONS.REMOVE_FROM_CHECKED_DELETE_OFFICER,
      id,
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