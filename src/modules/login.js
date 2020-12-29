/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.

const SET_EMAIL = "login/SET_EMAIL"
const SET_PASSWORD = "login/SET_PASSWORD"

const SET_TOKEN = "login/SET_TOKEN"
const SET_USER_INFO = "login/SET_USER_INFO"

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setEmail = (email) => ({
    type: SET_EMAIL,
    email
})
export const setPassword = (password) => ({
    type: SET_PASSWORD,
    password
})

export const setToken = ({accessToken}) => ({
    type: SET_TOKEN,
    accessToken
})


/* 초기 상태 선언 */
const loginDataState = {
    email: '',
    password: ''
}

const accessTokenState = {
    accessToken: ''
}

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export function loginReducer(state = loginDataState, action) {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.password
            }
        default:
            return state;
    }
};

export function accessTokenReducer(state = accessTokenState, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                accessToken: action.accessToken
            }
            default:
                return state;
    }
}

