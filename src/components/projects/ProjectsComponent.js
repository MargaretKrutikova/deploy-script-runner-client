import React from 'react';
import axios from 'axios';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import JobApiService from '../../services/api/JobApiService';
import SettingsApiService from '../../services/api/SettingsApiService';
import {} from './styles.css';

class ProjectsComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            projects: [],
            errorMessage: "" 
        };
    }
    componentDidMount() {
        this.getProjects();
    }
    getProjects() {
        SettingsApiService.GetProjects()
            .then(projects => { this.setState({ projects: projects, errorMessage: "" }); })
            .catch(errorMessage => this.onApiError(errorMessage));
    }
    startJob = (project, service) => {
        let authConfig = this.props.getAuthorizationApiConfig();

        JobApiService.StartJob(project, service, authConfig)
           .then(job => { this.props.history.push(`/jobs/${job.id}`) })
           .catch(errorMessage => { this.setState({ errorMessage: errorMessage }) });
    }
    render() {
        return (
            <div className="jombotron row">
                <div className="col-md-5">
                    <h1>Projects</h1>
                    {this.state.projects.map((project, index) => 
                    <div className="container" key={index}>
                        <h2>{project.name}</h2>
                        <div className="col-md-4 list-group">
                            {project.services.map((service, index) => 
                            <div className="list-group-item service-item" key={index}>
                                <div className="service-item__description">
                                    <h4 className="list-group-item-heading">{service.name}</h4>
                                    <p className="list-group-item-text">{service.description}</p>
                                </div>
                                <button className="btn btn-primary service-item__deploy-btn" onClick={()=> this.startJob(project.name, service.name)}>
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

export default ProjectsComponent;