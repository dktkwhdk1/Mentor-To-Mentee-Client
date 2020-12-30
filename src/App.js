import './App.css';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer';
import MyPage from './components/mypage/MyPage';
import ApplyMentor from './components/ApplyMentor';
import MyQuestion from './components/main/Main';
import QuestionAndAnswer from './components/myquestion/QuestionAndAnswer';
import MentorProfile from './components/mentor-profile/MentorProfile';

function App() {
  const [loginButtonOn, setLoginButtonOn] = useState(false);
  const isMentor = true;
  const mentorName = '김코딩';
  const mentorCompany = '뱅크샐러드';
  const mentorJob = '엔지니어링 파운데이션';
  const mentorIntroduction =
    'iOS 어플리케이션 엔지니어가 되고자하시는 분들의 꿈을 돕고자합니다. 대한민국에서 귀하디 귀하다는 iOS 엔지니어로 어떻게 성장하고 어떤 방법으로 핀테크 기업에 취업했는지 알고 싶은 분들을 기다립니다. 저의 멘티가 되어 더 멋진 엔지니어가 되어주세요.';

  return (
    <Router>
      <div className='App'>
      <Header
          loginButtonOn={loginButtonOn}
          setLoginButtonOn={setLoginButtonOn}
        />
        <main className='main'>
          <Switch>
            <Route path={`/mentorprofile/:username`} component={MentorProfile} />
            <Route path='/' exact={true}>
              <Main />
            </Route>
            <Route
              path='/myQuestion'
              component={() => {
                return (
                  <MyQuestion
                    mentorName={mentorName}
                    mentorCompany={mentorCompany}
                    mentorJob={mentorJob}
                  />
                );
              }}
            />
            <Route
              path='/myPage'
              component={() => <MyPage isMentor={isMentor} />}
            />
            <Route path='/applymentor' component={ApplyMentor} />
            <Route
              path='/QuestionAndAnswer'
              component={() => {
                return (
                  <QuestionAndAnswer
                    mentorName={mentorName}
                    mentorCompany={mentorCompany}
                    mentorJob={mentorJob}
                    mentorIntroduction={mentorIntroduction}
                  />
                );
              }}
            />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;