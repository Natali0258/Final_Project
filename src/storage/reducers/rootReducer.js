import { combineReducers } from 'redux';
import officersReducer from './officersReducer';
import casesReducer from './casesReducer';
import authReducer from './authReducer';


export default combineReducers({
   officers: officersReducer,
   cases: casesReducer,
   auth: authReducer,
})