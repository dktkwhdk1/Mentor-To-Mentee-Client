import { combineReducers } from "redux";
import mentorListReducer from "./main"
import login from './login';
import userInfoSetting from './userInfoSetting';
import menteeInfoSetting from './menteeInfoSetting';
import myQuestionReducer from './myQuestion'

const Reducer = combineReducers({
  mentorListReducer,
  login,
  userInfoSetting,
  menteeInfoSetting,
  myQuestionReducer
});

export default Reducer;
