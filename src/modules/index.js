import { combineReducers } from "redux";
import { loginReducer, accessTokenReducer } from "./login"
import mentorListReducer from "./main"

export default combineReducers({
    loginReducer,
    accessTokenReducer,
    mentorListReducer
});