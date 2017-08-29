import React from 'react';
import axios from 'axios';

class ProjectsComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            projects: [],
            errorMessage: "" 
        };
    }
    componentDidMount() {
        this._fetchProject();
    }
    _fetchProject() {
        axios.get('/api/settings/projects')
           .then(response => {
               this.setState({ projects: response.data });
            })
            .catch(error => {
                // TODO: error handling
                console.log(error);
            });
    }
    deployService(project, service) {
        let authConfig = this.props.getAuthorizationApiConfig();
        axios.post('/api/jobs', { project, service }, authConfig)
            .then(response => this.props.history.push(`/jobs/${response.data.id}`))
            .catch(error => {
                // TODO: error handling
                if (error.response.status === 401) { // unathorized
                    this.setState({ errorMessage: "You are unauthorized, please login!"});
                }
                
                console.log(error);
            });
    }
    render() {
        let errorMessage;
        if (this.state.errorMessage) {
            errorMessage = (
                <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                </div>);
        }
        return (
            <div className="jombotron">
                { errorMessage }
                <h1>Projects</h1>
                {this.state.projects.map((project, index) => 
                <div className="container" key={index}>
                    <h2>{project.name}</h2>
                    <div className="col-md-3 list-group">{project.services.map((service, index) => 
                        <div className="list-group-item " key={index}>
                            <h4 className="list-group-item-heading">{service.name}</h4>
                            <p className="list-group-item-text">{service.description}</p>
                            <button className="btn btn-primary" onClick={()=> this.deployService(project.name, service.name)}>Deploy</button>
                        </div>)}
                    </div>
                </div>)}
            </div>
        );
    }
}

export default ProjectsComponent;