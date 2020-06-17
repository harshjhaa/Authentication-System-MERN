import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Register from './components/Register/Register'
import Home from './components/Home/Home'

function App() {
  return (
    <div className="container">
      <hr />
      <h1 style={{ textAlign: 'center' }}>AUTHENTICATION SYSTEM</h1>
      <hr />
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route path="/register" render={props => <Register {...props} />} />
          <Route path="/home" render={props => <Home {...props} />} />
          <Route path="/logout" render={props => <Logout {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
