// 멘티 정보 설정
const SET_MENTEE = 'mypage/SET_MENTEE';

// 멘티 정보 설정
export const setMenteeInfo = menteeInfo => ({
  type: SET_MENTEE,
  ...menteeInfo,
});

// 멘티 정보 설정
export default function menteeInfoSetting(state = {}, action) {
  switch (action.type) {
    case SET_MENTEE:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
}
