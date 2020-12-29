import { combineReducers } from "redux";
import mentorListReducer from "./main"
import login from './login';
import userInfoSetting from './userInfoSetting';
import menteeInfoSetting from './menteeInfoSetting';

const Reducer = combineReducers({
  mentorListReducer,
  login,
  userInfoSetting,
  menteeInfoSetting,
});

export default Reducer;
