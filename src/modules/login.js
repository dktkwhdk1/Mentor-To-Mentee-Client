// 액션 타입 만들기
const SET_ACCESSTOKEN = 'login/SET_ACCESSTOKEN';
const SET_LOGIN = 'login/SET_LOGIN';

// 액션 생성함수 만들기
export const setAccessToken = token => ({ type: SET_ACCESSTOKEN, token });
export const setLogin = boolean => ({
  type: SET_LOGIN,
  isLogin: boolean,
});

const isLogin = {
  isLogin: false,
};

// 리듀서 선언
export function login(state = {}, action) {
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

export function isLoginReducer(state = isLogin, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    default:
      return state;
  }
}
