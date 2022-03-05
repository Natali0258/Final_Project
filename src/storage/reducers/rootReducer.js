import { combineReducers } from 'redux';
import officersReducer from './officersReducer';
import casesReducer from './casesReducer';


export default combineReducers({
   officers: officersReducer,
   cases: casesReducer,
})