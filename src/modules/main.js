/* 액션 타입 만들기 */
const SET_MENTOR_LIST = 'SET_MENTOR_LIST';

/* 액션 생성함수 만들기 */
export const setMentorListAction = mentorData => ({
  type: SET_MENTOR_LIST,
  mentorData,
});

/* 초기 상태 선언 */
const initialState = {
  mentorData: [],
};

/* 리듀서 선언 */
export default function mentorListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MENTOR_LIST:
      return {
        ...state,
        mentorData: action.mentorData,
      };
    default:
      return state;
  }
}
