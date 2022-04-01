import { CAS_ACTIONS } from "../actions/casesActions";

const initialState = {
   cases: []
}
const casesReducer = (state = initialState, action) => {
   switch (action.type) {
      case CAS_ACTIONS.ADD_TO_CAS:
         return {
            ...state,
            cases: [...state.cases,
            {
               id: action.payload.id,
               status: action.payload.status,
               licenseNumber: action.payload.licenseNumber,
               type: action.payload.type,
               ownerFullName: action.payload.ownerFullName,
               clientId: action.payload.clientId,
               createdAd: action.payload.createdAd,
               updatedAd: action.payload.updatedAd,
               color: action.payload.color,
               date: action.payload.date,
               officer: action.payload.officer,
               description: action.payload.description,
               resolution: action.payload.resolution,
               checkedDelet: action.payload.checkedDelet,
            }
            ]
         };

      //переключение состояния cas (случай)
      case CAS_ACTIONS.REMOVE_FROM_CHECKED_DELET_CAS:
         return state.map(cas => {
            if (cas.id === action.payload.id)
               return { ...cas, checkedDelet: !cas.checkedDelet }
            return cas;
         });

      case CAS_ACTIONS.REMOVE_FROM_CAS:
         return state.cases.filter(cas =>
            cas.id !== action.cas.payload.id
         );
      default: return state;
   }
}
export default casesReducer;