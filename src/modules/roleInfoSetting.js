// 멘티, 멘토 정보 설정
const SET_MENTEE = 'mypage/SET_MENTEE';
const SET_MENTOR = 'mypage/SET_MENTOR';

export const setMenteeInfo = menteeInfo => ({
  type: SET_MENTEE,
  ...menteeInfo,
});
export const setMentorInfo = mentorInfo => ({
  type: SET_MENTOR,
  ...mentorInfo,
});

export default function roleInfoSetting(
  state = { mentee: { graduation: '1', grade: '1' }, mentor: { company: '' } },
  action
) {
  switch (action.type) {
    case SET_MENTEE:
      return {
        ...state,
        mentee: { ...action },
      };
    case SET_MENTOR:
      return {
        ...state,
        mentor: { ...action },
      };
    default:
      return state;
  }
}
