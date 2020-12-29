// 액션 타입 만들기
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_ACCESSTOKEN = 'login/SET_ACCESSTOKEN';

// 액션 생성함수 만들기
export const setAccessToken = token => ({ type: SET_ACCESSTOKEN, token });

// 리듀서 선언
export default function login(state = {}, action) {
  switch (action.type) {
    case SET_ACCESSTOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
