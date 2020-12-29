import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../components/header/Login';
import { login } from '../modules/login';

function SigninContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { email, password } = useSelector(state => ({}));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  const onSignIn = () => dispatch(login);

  // 상태와 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
  return <Login email={email} password={password} onSignin={onSignIn} />;
}

export default SigninContainer;
