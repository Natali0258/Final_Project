import { CASE_ACTIONS } from "../actions/casesActions";

const initialState = {
   cases: []
}
const casesReducer = (state = initialState, action) => {
   switch (action.type) {
      case CASE_ACTIONS.ADD_TO_CASE:
         return {
            ...state,
            cases: [...state.cases,
            {
               id: action.id,
               status: action.status,
               licenseNumber: action.licenseNumber,
               type: action.type,
               ownerFullName: action.ownerFullName,
               clientId: action.clientId,
               createdAd: action.createdAd,
               updatedAd: action.updatedAd,
               color: action.color,
               date: action.date,
               officer: action.officer,
               description: action.description,
               resolution: action.resolution,
            }]
         }
      case CASE_ACTIONS.REMOVE_FROM_OFFICER:
         return {
            ...state,
            //officers:[...state.officers,
            cases: state.cases.filter(cas =>
               cas.id !== action.cas.id
            )
         }
      default: return state
   }
}
export default casesReducer;