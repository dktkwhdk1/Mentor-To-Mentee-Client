/* 액션 타입 만들기 */
const SET_MY_QUESTION_LIST = "SET_MY_QUESTION_LIST"


/* 액션 생성함수 만들기 */
export const setSentQuestionAction = (data) => ({
    type:  SET_MY_QUESTION_LIST,
    sentQuestion: data.sentQuestion,
    receivedQuestion: data.receivedQuestion
})

/* 초기 상태 선언 */
const initialState = {
    sentQuestion: [],
    receivedQuestion: []
}

/* 리듀서 선언 */
export default function myQuestionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MY_QUESTION_LIST:
            return {
                ...state,
                sentQuestion: action.sentQuestion,
                receivedQuestion: action.receivedQuestion
            }
            default:
                return state;
    }
};