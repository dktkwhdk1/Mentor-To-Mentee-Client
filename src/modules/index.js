import { combineReducers } from 'redux';
import mentorListReducer from './main';
import login from './login';
import userInfoSetting from './userInfoSetting';
import roleInfoSetting from './roleInfoSetting';
import myQuestionReducer from './myQuestion';

const Reducer = combineReducers({
  mentorListReducer,
  login,
  userInfoSetting,
  roleInfoSetting,
  myQuestionReducer,
});

export default Reducer;
