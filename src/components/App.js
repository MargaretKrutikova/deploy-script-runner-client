import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import AboutComponent from './about/AboutComponent';
import ProjectsComponent from './projects/ProjectsComponent';
import JobComponent from './jobs/JobComponent';
import JobListComponent from './jobs/JobListComponent';
import LoginComponent from './login/LoginComponent';
import './App.css';

const authInfoLocalStorageKey = "AUTH_INFO";

class App extends Component {
  constructor(props) {
    super(props);

    // get the initial auth info from the local storage.
    this.state = { 
      authInfo: this._getUserInfoFromStorage() 
    };
  }

  _getUserInfoFromStorage = () => {
    // check local storage for auth token
    let authInfoItem = localStorage.getItem(authInfoLocalStorageKey);
    if (!authInfoItem) {
      return null;
    } 
    let authInfo = JSON.parse(authInfoItem);
    
    // auth info is invalidated if it has expired
    if (this._isAuthInfoExpired(authInfo)) {
      localStorage.removeItem(authInfoLocalStorageKey);
      return null;
    }

    return authInfo;
  }

  _isAuthInfoExpired(authInfo) {
    return Date.now() > Date.parse(authInfo.expiration);
  }

  onUserAuthenticated = (authInfo) => {
    this.setState({ authInfo : authInfo });
    localStorage.setItem(authInfoLocalStorageKey, JSON.stringify(authInfo));
  }

  invalidateAuthInfo = () => {
    this.setState({ authInfo : null });
    localStorage.removeItem(authInfoLocalStorageKey);
  }

  getAuthorizationApiConfig() {
    let config = { };
    
    if (this.state.authInfo == null) {
      return config;
    }

    if (this._isAuthInfoExpired(this.state.authInfo)) {
      this.invalidateAuthInfo();
    } else {    
      config.headers = {'Authorization': `Bearer ${this.state.authInfo.token}`};
    }

    return config;
  }
  render() {
    return (
      <HashRouter>
        <div className="App">

        <div className="App-header navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Deploy Service</Link>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
              </ul>
              <LoginComponent 
                styles="navbar-right"
                onAuthenticated={this.onUserAuthenticated}
                onLogout={this.invalidateAuthInfo}
                authInfo={this.state.authInfo}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <Route exact path="/" component={AboutComponent}/>
          <Route path="/projects" component={(props) => 
              (<ProjectsComponent {...props} getAuthorizationApiConfig={() => this.getAuthorizationApiConfig()}/>)} 
          />

          <Route exact path="/jobs" component={(props) => 
              (<JobListComponent {...props} getAuthorizationApiConfig={() => this.getAuthorizationApiConfig()}/>)} 
          />

          <Route path="/jobs/:id" component={(props) => 
              (<JobComponent {...props} getAuthorizationApiConfig={() => this.getAuthorizationApiConfig()}/>)} 
          />         
        </div>

        </div>
      </HashRouter>
    );
  }
}

export default App;

// props (they are immutable!) are all the values passed into the component, unlike state they cannot be changed

// setState method NOTE: use prevState if the update depends on the current state to avoid race conditions
// since setState is async - just scheduels  updates => multiple setState calls might be batched for performance 
// both reading and writing to the state in the component can cause race conditions

// the place where you define the state - is an important question when designing react components