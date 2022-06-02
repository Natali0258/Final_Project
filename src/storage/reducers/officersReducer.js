import { CAS_ACTIONS } from '../actions/casesActions';
import { OFFICER_ACTIONS } from '../actions/officerActions';

const initialState = {
   officers: [],
   isLoading: false,
   error: null,
}
const officersReducer = (state = initialState, action) => {
   switch (action.type) {
      case OFFICER_ACTIONS.ADD_TO_OFFICER:
         return {
            ...state,
            officers: [...state.officers,
            {
               id: action.payload.id,
               email: action.payload.email,
               password: action.payload.password,
               firstName: action.payload.firstName,
               lastName: action.payload.lastName,
               clientId: action.payload.clientId,
               approved: action.payload.approved,
            }]
         };
      case OFFICER_ACTIONS.REMOVE_FROM_OFFICER:
         return state.officers.filter(officer =>
            officer.id !== action.officer.id
         );
      //Запрос авторизации сотрудника
      case OFFICER_ACTIONS.FATCH_AUTH_OFFICER_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_AUTH_OFFICER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_AUTH_OFFICER_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      //Запрос для проверки валидности токена
      case OFFICER_ACTIONS.FATCH_TOKEN_VALIDITY_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_TOKEN_VALIDITY_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_TOKEN_VALIDITY_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      //Запрос для создания новой учетной записи
      case OFFICER_ACTIONS.FATCH_OFFICER_SEND_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_SEND_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_SEND_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      //получение данных о сотрудниках и загрузка в Redux
      case OFFICER_ACTIONS.FATCH_OFFICERS_GET_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICERS_GET_SUCCESS:
         return {
            ...state,
            isLoading: false,
            officers: action.officers,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICERS_GET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      //получение данных об одном сотруднике и загрузка в Redux
      case OFFICER_ACTIONS.FATCH_OFFICER_GET_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_GET_SUCCESS:
         const index = state.officers.findIndex(officer => officer._id === action.data.data._id)
         // console.log('state.officers=', state.officers)
         // console.log('action.data.data=', action.data.data)
         // console.log('index=', index)
         return {
            ...state,
            isLoading: false,
            officers: [...state.officers.slice(0, index), action.data.data, ...state.officers.slice((index + 1), state.officers.length)],
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_GET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      // Запрос для редактирования данных о сотруднике
      case OFFICER_ACTIONS.FATCH_OFFICER_EDIT_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_EDIT_SUCCESS:
         const indexOfficer = state.officers.findIndex(officer => officer._id === action.data.data._id)
         console.log('state.officers=', state.officers)
         console.log('action.data.data=', action.data.data)
         console.log('index=', indexOfficer)
         return {
            ...state,
            isLoading: false,
            officers: [...state.officers.slice(0, indexOfficer), action.data.data, ...state.officers.slice((indexOfficer + 1), state.officers.length)],
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_EDIT_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      // Запрос для даления данных о сотруднике
      case OFFICER_ACTIONS.FATCH_OFFICER_REMOVE_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_REMOVE_SUCCESS:
         const idxOfficer = state.officers.findIndex(officer => officer._id === action.id)
         //console.log('state.officers=', state.officers)
         //console.log('action.data.data=', action.data.data)
         //console.log('idx=', idxOfficer)
         return {
            ...state,
            isLoading: false,
            officers: [...state.officers.slice(0, idxOfficer), ...state.officers.slice((idxOfficer + 1), state.officers.length)],
            error: null,
         }
      case OFFICER_ACTIONS.FATCH_OFFICER_REMOVE_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      default: return state;
   }
}
export default officersReducer;