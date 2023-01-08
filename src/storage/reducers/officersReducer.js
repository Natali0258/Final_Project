import { OFFICER_ACTIONS } from '../actions/officerActions';

const initialState = {
   officers: [],
   isLoading: false,
   error: null,
   isModalActive: false,
   isRegistration: false,
   isRegResult: false,  //флаг успешной регистрации
   isFormRegistration: false,
}
const officersReducer = (state = initialState, action) => {
   switch (action.type) {
      //Удаление данных о сотруднике
      case OFFICER_ACTIONS.REMOVE_FROM_OFFICER:
         return state.officers.filter(officer =>
            officer.id !== action.officer.id
         );

      //Вызов модального окна
      case OFFICER_ACTIONS.GET_MODAL:
         return {
            ...state,
            isModalActive: true,
            error: null,
         }
      //Закрытие модального окна
      case OFFICER_ACTIONS.CLOSE_MODAL:
         return {
            ...state,
            isModalActive: false,
            error: null,
         }

      //Вызов окна регистрации:
      case OFFICER_ACTIONS.GET_REGISTRATION:
         return {
            ...state,
            isRegistration: true,
            error: null,
         }

      //Закрытие окна регистрации:
      case OFFICER_ACTIONS.CLOSE_REGISTRATION:
         return {
            ...state,
            isRegistration: false,
            error: null,
         }
      //Вывод сообщения о результате регистрации
      case OFFICER_ACTIONS.RESULT_REGISTRATION:
         return {
            ...state,
            isRegResult: true,
         }
      //Закрыть сообщение о результате регистрации
      case OFFICER_ACTIONS.CLOSE_RESULT_REGISTRATION:
         return {
            ...state,
            isRegResult: false,
         }

      //Запрос для проверки валидности токена
      case OFFICER_ACTIONS.FETCH_TOKEN_VALIDITY_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_TOKEN_VALIDITY_SUCCESS:
         return {
            ...state,
            isLoading: false,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_TOKEN_VALIDITY_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      //Запрос для создания новой учетной записи
      case OFFICER_ACTIONS.FETCH_OFFICER_SEND_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_SEND_SUCCESS:
         return {
            ...state,
            isRegistration: true,
            isRegResult: true,
            isLoading: false,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_SEND_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.Error,
         }
      //получение данных о сотрудниках и загрузка в Redux
      case OFFICER_ACTIONS.FETCH_OFFICERS_GET_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICERS_GET_SUCCESS:
         return {
            ...state,
            isLoading: false,
            officers: action.officers.officers,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICERS_GET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      //получение данных об одном сотруднике и загрузка в Redux
      case OFFICER_ACTIONS.FETCH_OFFICER_GET_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_GET_SUCCESS:
         const index = state.officers.findIndex(officer => officer._id === action.data.data._id)
         return {
            ...state,
            isLoading: false,
            officers: [...state.officers.slice(0, index), action.data.data, ...state.officers.slice((index + 1), state.officers.length)],
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_GET_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }
      // Запрос для редактирования данных о сотруднике
      case OFFICER_ACTIONS.FETCH_OFFICER_EDIT_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_EDIT_SUCCESS:
         const indexOfficer = state.officers.findIndex(officer => officer._id === action.data.data._id)
         return {
            ...state,
            isLoading: false,
            officers: [...state.officers.slice(0, indexOfficer), action.data.data, ...state.officers.slice((indexOfficer + 1), state.officers.length)],
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_EDIT_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      // Запрос для даления данных о сотруднике
      case OFFICER_ACTIONS.FETCH_OFFICER_REMOVE_STARTED:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_REMOVE_SUCCESS:
         const idxOfficer = state.officers.findIndex(officer => officer._id === action.id)
         return {
            ...state,
            isLoading: false,
            officers: [...state.officers.slice(0, idxOfficer), ...state.officers.slice((idxOfficer + 1), state.officers.length)],
            error: null,
         }
      case OFFICER_ACTIONS.FETCH_OFFICER_REMOVE_ERROR:
         return {
            ...state,
            isLoading: false,
            error: action.error,
         }

      default: return state;
   }
}
export default officersReducer;