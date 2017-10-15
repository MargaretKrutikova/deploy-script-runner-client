import React from 'react';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import JobApiService from '../../services/api/JobApiService';
import SettingsApiService from '../../services/api/SettingsApiService';
import {} from './styles.css';

class GroupsComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            groups: [],
            errorMessage: "" 
        };
    }
    componentDidMount() {
        this.getGroups();
    }
    getGroups() {
        SettingsApiService.GetGroups()
            .then(groups => { this.setState({ groups: groups, errorMessage: "" }); })
            .catch(errorMessage => { this.setState({ errorMessage: errorMessage }) });
    }
    startJob = (group, service) => {
        let authConfig = this.props.getAuthorizationApiConfig();

        JobApiService.StartJob(group, service, authConfig)
           .then(job => { this.props.history.push(`/jobs/${job.id}`) })
           .catch(errorMessage => { this.setState({ errorMessage: errorMessage }) });
    }
    render() {
        return (
            <div className="jombotron row">
                <div className="col-md-5">
                    <h1>Groups</h1>
                    {this.state.groups.map((group, index) => 
                    <div className="container" key={index}>
                        <h2>{group.name}</h2>
                        <div className="col-md-4 list-group">
                            {group.services.map((service, index) => 
                            <div className="list-group-item service-item" key={index}>
                                <div className="service-item__description">
                                    <h4 className="list-group-item-heading">{service.name}</h4>
                                    <p className="list-group-item-text">{service.description}</p>
                                </div>
                                <button className="btn btn-primary service-item__deploy-btn" onClick={()=> this.startJob(group.name, service.name)}>
                                    Deploy
                                </button>
                            </div>)}
                        </div>
                    </div>)}
                </div>
                <div className="col-md-5">
                    <AutoCloseAlertComponent message={this.state.errorMessage} type="danger" />
                </div>
            </div>
        );
    }
}

export default GroupsComponent;