import React from 'react';
import TextInput from '../common/TextInput';
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
           .then(authInfo => { 
               this.props.onAuthenticated(authInfo);
               this.props.history.push('/projects');
            })
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
    render() {
        const isLoggedIn = this.props.authInfo != null;
        const userName = isLoggedIn ? this.props.authInfo.userName : null;
        const { verticalLayout = true, className = "" } = this.props;

        let loginComponent;
        if (!isLoggedIn || !userName) {
            loginComponent = 
                <div className={"login-form " + className}>
                  <form onSubmit={this.login} className={'login-form__form ' + (!verticalLayout ? 'login-form__form--inline' : '')}>
                    <TextInput {...this.state.userName} 
                        name="userName"
                        placeholder="username"
                        onChange={this.handleInputChange}
                        verticalLayout={verticalLayout}
                    />
                    <TextInput {...this.state.password} 
                        type="password" 
                        name="password"
                        placeholder="password"
                        onChange={this.handleInputChange}
                        verticalLayout={verticalLayout}
                    />
                    <button className="btn btn-success" type="submit">Login</button>
                </form>
                <div className="login-form__error-message">{this.state.errorMessage}</div>
            </div>
        } else {
            loginComponent = 
            <div>
                <span className="navbar-text">Logged in as {userName}</span>
                <button className="btn btn-default btn-sm navbar-btn" onClick={this.logout}>Logout</button>
            </div>
        }

        return (loginComponent);
    }
}

export default LoginComponent;