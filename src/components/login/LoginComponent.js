import React from 'react';
import axios from 'axios';
import {} from './styles.css';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { userName: "", password: "" };
    }
    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }
    login = (event) => {
        event.preventDefault();
        let loginInfo = {
            userName: this.state.userName,
            password: this.state.password
        };

        // get auth token from the web api
        axios.post('/api/auth/token', loginInfo)
            .then(response => {
                this.props.onAuthenticated(response.data);
            })
            .catch(error => {
                // TODO: error handling for 401 unathorized and validation errors
                console.log(error);
            });
    }
    logout = (event) => {
        event.preventDefault();
        this.props.onLogout();
    }
    loginFormStyles() {
        let styles = this.props.styles || "";
        return `form-login navbar-form ${styles}`;
    }
    render() {
        const isLoggedIn = this.props.authInfo != null;
        const userName = isLoggedIn ? this.props.authInfo.userName : null;

        let loginComponent;
        if (!isLoggedIn || !userName) {
            loginComponent = 
            <form className={this.loginFormStyles()} onSubmit={this.login}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={this.handleInputChange} 
                        value={this.state.userName}
                        name="userName"
                        placeholder="username"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        onChange={this.handleInputChange} 
                        value={this.state.password}
                        name="password"
                        placeholder="password"
                    />
                </div>
                <button className="btn btn-success" type="submit">Login</button>
            </form>
        } else {
            loginComponent = 
            <div className={this.props.styles}>
                <span className="navbar-text">Logged in as {userName}</span>
                <button className="btn btn-default btn-sm navbar-btn" onClick={this.logout}>Logout</button>
            </div>
        }

        return (loginComponent );
    }
}

export default LoginComponent;