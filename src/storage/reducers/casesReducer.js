import { CASE_ACTIONS } from "../actions/casesActions";

const initialState = {
   bikeType: ['', 'general', 'sport'],
   caseStatus: ['', 'new', 'in_progress', 'done'],
   cases: [],
   isLoading: false,
   error: null,
}
const casesReducer = (state = initialState, action) => {
   switch (action.type) {
      case CASE_ACTIONS.ADD_TO_CASE:
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
               createdAt: action.payload.createdAt,
               updatedAt: action.payload.updatedAt,
               color: action.payload.color,
               date: action.payload.date,
               officer: action.payload.officer,
               description: action.payload.description,
               resolution: action.payload.resolution,
            }]
         };

      //Запрос для создания нового сообщения о краже 
      case CASE_ACTIONS.FETCH_CASE_SEND_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_SEND_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_SEND_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      //Запрос для получения всех сообщений о краже
      case CASE_ACTIONS.FETCH_CASES_GET_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASES_GET_SUCCESS:
         return {
            ...state,
            cases: action.data.data,
            isLoading: false,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASES_GET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      //DEL Запрос для удаления сообщения о краже
      case CASE_ACTIONS.FETCH_CASE_REMOVE_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_REMOVE_SUCCESS:
         return {
            ...state,
            cases: state.cases.filter(caseObj => caseObj._id !== action.id),
            isLoading: false,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_REMOVE_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      //GET Запрос для получения данных одного сообщения о краже
      case CASE_ACTIONS.FETCH_CASE_GET_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_GET_SUCCESS:
         const index = state.cases.findIndex(caseObj => caseObj._id === action.data.data._id)
         return {
            ...state,
            isLoading: false,
            cases: [...state.cases.slice(0, index), action.data.data, ...state.cases.slice((index + 1), state.cases.length)],
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_GET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      //PUT Запрос для редактирования сообщения о краже
      case CASE_ACTIONS.FETCH_CASE_EDIT_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_EDIT_SUCCESS:
         const indexCase = state.cases.findIndex(caseObj => caseObj._id === action.data.data._id)
         return {
            ...state,
            isLoading: false,
            officers: [...state.cases.slice(0, indexCase), action.data.data, ...state.cases.slice((indexCase + 1), state.cases.length)],
            error: null,
         }
      case CASE_ACTIONS.FETCH_CASE_EDIT_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      default: return state;
   }
}
export default casesReducer;