import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer';
import MyPage from './components/mypage/MyPage';
import ApplyMentor from './components/ApplyMentor';
import MyQuestion from './components/myquestion/MyQuestion';
import QuestionAndAnswer from './components/myquestion/QuestionAndAnswer';
import MentorProfile from './components/mentor-profile/MentorProfile';
import { setUserInfo } from './modules/userInfoSetting';
import { setAccessToken, setLogin } from './modules/login';
import axios from 'axios';
axios.defaults.withCredentials = true;

function App() {
  const [loginButtonOn, setLoginButtonOn] = useState(false);
  const dispatch = useDispatch();
  let accessToken = useSelector(state => state.login.token);
  axios.get('https://localhost:4000/isAuth').then(async res => {
    if (res.data.data.accessToken) {
      if (!accessToken) {
        if (res.data.message === 'naver') {
          let response = await axios.get(
            'https://localhost:4000/getNaverUserInfo'
          );
          let naverUserInfo = response.data.data;
          dispatch(setUserInfo(naverUserInfo));
        }
        dispatch(setAccessToken(res.data.data.accessToken));
        dispatch(setLogin(true));
      }
    }
  });
  return (
    <Router>
      <div className='App'>
        <Header
          loginButtonOn={loginButtonOn}
          setLoginButtonOn={setLoginButtonOn}
        />
        <main className='main'>
          <Switch>
            <Route
              path={`/mentorprofile/:mentorId`}
              component={MentorProfile}
            />
            <Route path='/' exact={true}>
              <Main />
            </Route>
            <Route path='/myquestion' component={MyQuestion} />
            <Route path='/mypage' component={MyPage} />
            <Route path='/applymentor' component={ApplyMentor} />
            <Route
              path={`/QuestionAndAnswer/:id`}
              component={QuestionAndAnswer}
            />
          </Switch>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
