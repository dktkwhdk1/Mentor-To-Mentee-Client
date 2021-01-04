// 계정 설정
const SET_USERINFO = 'mypage/SET_USERINFO';

export const setUserInfo = userinfo => ({ type: SET_USERINFO, ...userinfo });

export default function userInfoSetting(
  state = {
    mobile: '',
    gender: '1',
  },
  action
) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
}
