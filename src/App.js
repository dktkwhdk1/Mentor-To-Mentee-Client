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
import MentorProfile from './components/MentorProfile';

function App() {

  return (
    <Router>
      <div className='App'>
        <Header />

        <main className="main">
          <Switch>
            <Route path="/mentorprofile">
              <MentorProfile />
            </Route>
            <Route path="/mypage">
              <MyPage />
            </Route>
            <Route path="/applymentor">
              <ApplyMentor />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;