/* 액션 타입 만들기 */
const SET_MENTOR_LIST = "SET_MENTOR_LIST"


/* 액션 생성함수 만들기 */
export const setMentorList = ({data}) => ({
    type: SET_MENTOR_LIST,
    data
})

/* 초기 상태 선언 */
const initialState = {
    data: []
}

/* 리듀서 선언 */
export default function mentorListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MENTOR_LIST:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
};