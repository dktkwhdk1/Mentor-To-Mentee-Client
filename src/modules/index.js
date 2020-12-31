import { combineReducers } from 'redux';
import mentorListReducer from './main';
import login from './login';
import userInfoSetting from './userInfoSetting';
import roleInfoSetting from './roleInfoSetting';

const Reducer = combineReducers({
  mentorListReducer,
  login,
  userInfoSetting,
  roleInfoSetting,
});

export default Reducer;
