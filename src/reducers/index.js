import { combineReducers } from "redux";
import { language } from './language';
import { loggedIn } from './loggedIn';
export default combineReducers({language, loggedIn});