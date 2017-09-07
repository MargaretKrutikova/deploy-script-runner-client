import React from 'react';
import axios from 'axios';
import InputWrapper from './InputWrapper';
import AuthApiService from '../../services/api/AuthApiService';
import {} from './styles.css';

class LoginComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            userName: { value: "", isValid: true }, 
            password: { value: "", isValid: true },
            errorMessage: ""
        };
    }
    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: { value: value, isValid: true }, errorMessage: ""});
    }
    login = (event) => {
        event.preventDefault();

        AuthApiService.Login(this.state.userName.value, this.state.password.value)
           .then(authInfo => { this.props.onAuthenticated(authInfo); })
           .catch(loginError => { 
                this.setState({ errorMessage: loginError.message });
                
                for (let error of loginError.validationErrors) {
                    this.setState(prevState => ({ 
                        [error.field]: { value: prevState[error.field].value, isValid: false} 
                    }));
                }
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
                <InputWrapper {...this.state.userName} 
                    name="userName"
                    placeholder="username" 
                    onChange={this.handleInputChange}
                />
                <InputWrapper {...this.state.password} 
                    type="password" 
                    name="password"
                    placeholder="password" 
                    onChange={this.handleInputChange}
                />
                <button className="btn btn-success" type="submit">Login</button>
                <div className="form-login__error-message help-block">{this.state.errorMessage}</div>
            </form>
        } else {
            loginComponent = 
            <div className={this.props.styles + " logout-panel"}>
                <span className="navbar-text">Logged in as {userName}</span>
                <button className="btn btn-default btn-sm navbar-btn" onClick={this.logout}>Logout</button>
            </div>
        }

        return (loginComponent);
    }
}

export default LoginComponent;