import React from 'react';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import JobDetailComponent from './JobDetailComponent';
import JobActionsComponent from './JobActionsComponent';
import JobApiService from '../../services/api/JobApiService';

import { } from './styles.css';

class JobComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {},
            jobId: this.props.match.params.id,
            errorMessage: ""
        };
    }
    componentDidMount() { this.getJob(); }
    getJob = () => {
        let authConfig = this.props.getAuthorizationApiConfig();

        JobApiService.GetJob(this.state.jobId, authConfig)
            .then(job => { this.setState({ job: job, errorMessage: "" }); })
            .catch(errorMessage => { this.setState({ errorMessage: errorMessage }) });
    }
    onApiError = (errorMessage) => {
        this.setState({ errorMessage: errorMessage });
    }
    onActionCompleted = (actionResult) => {
        if (actionResult.job) {
            this.setState({ job: actionResult.job, errorMessage: ""});
        }
        if (actionResult.action === "REMOVED") {
            this.props.history.push(`/jobs/`);
        }
    }
    render() {
        return (
            <div className="jombotron">
                <div className="col-md-6">
                    <JobDetailComponent job={this.state.job} />
                    <div className="job-actions-container job-actions-container--single-job">
                        <JobActionsComponent 
                            jobId={this.state.job.id} 
                            getApiConfig={this.props.getAuthorizationApiConfig} 
                            onActionCompleted={this.onActionCompleted} 
                            onError={this.onApiError} />
                    </div>
                </div>
                <div className="col-md-5">
                    <AutoCloseAlertComponent message={this.state.errorMessage} type="danger" />
                </div>
            </div>
        );
    }
}

export default JobComponent;