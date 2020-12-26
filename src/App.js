import './App.css';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import MyPage from './components/MyPage'
import ApplyMentor from './components/ApplyMentor';

function App() {
  // Login 버튼 클릭시 모달창열기
  const [loginButtonOn, setLoginButtonOn] = useState(false);

  return (
    <Router>
      <div className='App'>
        <Header loginButtonOn={loginButtonOn} setLoginButtonOn={setLoginButtonOn} />

        <Switch>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route path="/applymentor">
            <ApplyMentor/>
          </Route>
          <Route path="/">
            <Main loginButtonOn={loginButtonOn} setLoginButtonOn={setLoginButtonOn} />
          </Route>
        </Switch>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;