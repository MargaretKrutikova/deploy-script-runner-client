import React from 'react';
import { Link } from 'react-router-dom';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import JobActionsComponent from './JobActionsComponent';
import JobApiService from '../../services/api/JobApiService';

import { } from './styles.css';

class JobListComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { jobs: [], errorMessage: "" };
    }
    componentDidMount() { this.getJobs(); }
    getJobs() {
        let authConfig = this.props.getAuthorizationApiConfig();

        JobApiService.GetJobs(authConfig)
            .then(jobs => { this.setState({ jobs: jobs, errorMessage: "" }); })
            .catch(errorMessage => this.onApiError(errorMessage));
    }
    removeJobs = () => {
        let authConfig = this.props.getAuthorizationApiConfig();

        JobApiService.RemoveJobs(authConfig)
            .then(jobs => { this.getJobs(); }) // not all jobs are allowed to be removed
            .catch(errorMessage => this.onApiError(errorMessage));
    }
    onApiError = (errorMessage) => {
        this.setState({ errorMessage: errorMessage });
    }
    onActionCompleted = (index, actionResult) => {
        if (actionResult.job) {
            this.setState(prevState => {
                prevState.jobs[index] = actionResult.job;
                return { jobs: prevState.jobs, errorMessage: "" }
            });
        }
        if (actionResult.action === "REMOVED") {
            this.setState(prevState => {
                prevState.jobs.splice(index, 1);
                return { jobs: prevState.jobs, errorMessage: "" }
            });
        }
    }
    
    render() {
        return (
            <div className="jombotron row">
                <div style={{ height: '40px'}}>
                    <AutoCloseAlertComponent  message={this.state.errorMessage} type="danger" />
                </div>
                
                <h1>Jobs</h1>
                <div className="col-md-8 jobs-table-wrapper">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>group</th>
                        <th>service</th>
                        <th>status</th>
                        <th>end time</th>
                        <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.jobs.map((job, index) => 
                        <tr scope="row" key={index} className="jobs-table__row">
                            <td className=""><Link to={`/jobs/${job.id}`}>{job.id}</Link></td>
                            <td className="">{job.group}</td>
                            <td className="">{job.service}</td>
                            <td className="">{job.status}</td>
                            <td className="">{job.endTime}</td>
                            <td className="job-actions-container--compact">
                                <JobActionsComponent 
                                    jobId={job.id} 
                                    getApiConfig={this.props.getAuthorizationApiConfig} 
                                    onActionCompleted={this.onActionCompleted.bind(this, index)} 
                                    onError={this.onApiError} />
                            </td>
                        </tr>)
                     }
                    </tbody>
                </table>
                <button className="btn btn-danger " onClick={this.removeJobs}>Remove all</button>
                </div>
            </div>
        );
    }
}

export default JobListComponent;