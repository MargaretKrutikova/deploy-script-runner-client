import React from 'react';
import axios from 'axios';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import ApiErrorHandler from '../../services/apiErrorHandler';
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
        this._fetchProjects();
    }
    _fetchProjects() {
        axios.get('/api/settings/projects')
           .then(response => {
               this.setState({ projects: response.data, errorMessage: "" });
            })
            .catch(error => {
                this.setState({ errorMessage: ApiErrorHandler.GetGenericErrorMessage(error) });
                console.log(error);
            });
    }
    deployService(project, service) {
        let authConfig = this.props.getAuthorizationApiConfig();
        axios.post('/api/jobs', { project, service }, authConfig)
            .then(response => {
                this.setState({ errorMessage: "" });
                this.props.history.push(`/jobs/${response.data.id}`);
            })
            .catch(error => {
                this.setState({ errorMessage: ApiErrorHandler.GetGenericErrorMessage(error) });
                console.log(error);
            });
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
                                <button className="btn btn-primary service-item__deploy-btn" onClick={()=> this.deployService(project.name, service.name)}>
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