import { combineReducers } from 'redux';
import login from './login';
import userInfoSetting from './userInfoSetting';
import menteeInfoSetting from './menteeInfoSetting';

const Reducer = combineReducers({
  login,
  userInfoSetting,
  menteeInfoSetting,
});

export default Reducer;
