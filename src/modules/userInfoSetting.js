// 계정 설정
const SET_USERINFO = 'mypage/SET_USERINFO';

// 계정 설정
export const setUserInfo = userinfo => ({ type: SET_USERINFO, ...userinfo });

// 계정 설정
export default function userInfoSetting(
  state = {
    mobile: '',
    gender: '1',
    image:
      'https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png',
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
