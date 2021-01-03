import './App.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import MyQuestion from './components/myquestion/MyQuestion';
import QuestionAndAnswer from './components/myquestion/QuestionAndAnswer';
import MentorProfile from './components/mentor-profile/MentorProfile';
function App() {
  const [loginButtonOn, setLoginButtonOn] = useState(false);
  const isMentor = true;

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
              path={`/mentorprofile/:username`}
              component={MentorProfile}
            />
            <Route path='/' exact={true}>
              <Main />
            </Route>
            <Route path='/myquestion' component={MyQuestion} />
            <Route
              path='/mypage'
              component={() => <MyPage isMentor={isMentor} />}
            />
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
