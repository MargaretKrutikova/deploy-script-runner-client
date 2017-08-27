import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AboutComponent from './about/AboutComponent';
import ProjectsComponent from './projects/ProjectsComponent';
import JobComponent from './jobs/JobComponent';
import LoginComponent from './login/LoginComponent';
import './App.css';

const authInfoLocalStorageKey = "AUTH_INFO";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authInfo: null };
  }
  
  componentDidMount() {
    // check local storage for auth token
    let authInfoItem = localStorage.getItem(authInfoLocalStorageKey);
    if (authInfoItem) {
      // TODO: check expiration
      this.setState({ authInfo : JSON.parse(authInfoItem) });
    }
  }
  onUserAuthenticated = (authInfo) => {
     this.setState({ authInfo : authInfo });
     localStorage.setItem(authInfoLocalStorageKey, JSON.stringify(authInfo));
  }
  render() {
    return (
      <Router>
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
                formStyles="navbar-form navbar-right"
                onAuthenticated={this.onUserAuthenticated} 
                authInfo={this.state.authInfo}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <Route exact path="/" component={AboutComponent} />
          <Route path="/projects" component={ProjectsComponent}/>
          <Route path="/jobs/:id" component={JobComponent}/> 
        </div>

        </div>
      </Router>
    );
  }
}

export default App;

// props (they are immutable!) are all the values passed into the component, unlike state they cannot be changed

// setState method NOTE: use prevState if the update depends on the current state to avoid race conditions
// since setState is async - just scheduels  updates => multiple setState calls might be batched for performance 
// both reading and writing to the state in the component can cause race conditions

// the place where you define the state - is an important question when designing react components