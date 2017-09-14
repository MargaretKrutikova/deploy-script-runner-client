import React from 'react';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import { Link } from 'react-router-dom';
import SettingsApiService from '../../services/api/SettingsApiService';

import {} from './styles.css';

const settingsReloadedUserMessage = "Settings reloaded successfully.";

class SettingsComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            doneMessage: "",
            errorMessage: "" 
        };
    }
    reloadSettings = () => {
      let authConfig = this.props.getAuthorizationApiConfig();

      SettingsApiService.ReloadSettings(authConfig)
          .then(projects => { this.setState({ errorMessage: "", doneMessage: settingsReloadedUserMessage }); })
          .catch(errorMessage => { this.setState({ errorMessage: errorMessage, doneMessage: "" }) });
    }
    render() {
        return (
            <div className="jombotron row">
                <div className="col-md-6">
                    <p className="reload-settings-message">
                      This will reload deployment settings from the settings file. <br />
                      If the file has changed, the changes will appear in the <Link to={"/projects"}>projects</Link>.
                    </p>
                    <button data-toggle="tooltip" 
                        title="cancel" 
                        className="btn btn-warning" 
                        onClick={this.reloadSettings}>
                    <span className="glyphicon glyphicon glyphicon-alert"></span>
                    <span className="job-action-name">Reload settings</span>
                </button>
                </div>
                <div className="col-md-5">
                    <AutoCloseAlertComponent message={this.state.doneMessage} type="info" />
                    <AutoCloseAlertComponent message={this.state.errorMessage} type="danger" />
                </div>
            </div>
        );
    }
}

export default SettingsComponent;