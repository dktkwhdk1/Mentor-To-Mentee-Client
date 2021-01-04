import { combineReducers } from 'redux';
import mentorListReducer from './main';
import { login, isLoginReducer } from './login';
import userInfoSetting from './userInfoSetting';
import roleInfoSetting from './roleInfoSetting';
import myQuestionReducer from './myQuestion';

const Reducer = combineReducers({
  mentorListReducer,
  login,
  userInfoSetting,
  roleInfoSetting,
  myQuestionReducer,
  isLoginReducer,
});

export default Reducer;
