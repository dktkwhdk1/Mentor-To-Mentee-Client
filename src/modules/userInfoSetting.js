// 계정 설정
const SET_USERINFO = 'mypage/SET_USERINFO';

// 계정 설정
export const setUserInfo = userinfo => ({ type: SET_USERINFO, ...userinfo });

// 계정 설정
export default function userInfoSetting(
  state = { mobile: '', gender: '1' },
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
