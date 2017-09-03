import React from 'react';
import axios from 'axios';
import AutoCloseAlertComponent from '../popups/AutoCloseAlertComponent';
import JobDetailComponent from './JobDetailComponent';
import ApiErrorHandler from '../../services/apiErrorHandler';
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
    urlForCurrentJob = (jobId) => `/api/jobs/${this.state.jobId}`
    componentDidMount() {
        this._fetchJobInfo();
    }
    _fetchJobInfo = () => {
        let authConfig = this.props.getAuthorizationApiConfig();
        axios.get(this.urlForCurrentJob(), authConfig)
            .then(response => {
                this.setState({ job: response.data, errorMessage: "" });
            })
            .catch(error => {
                this.setState({ errorMessage: ApiErrorHandler.GetGenericErrorMessage(error) });
                console.log(error);
            });
    }
    cancelJob = () => {
        let authConfig = this.props.getAuthorizationApiConfig();
        axios.put(this.urlForCurrentJob(), { status: "CANCELLED" }, authConfig)
            .then(response => {
                // update cancelled job
                this._fetchJobInfo();
                this.setState({ errorMessage: "" });
            })
            .catch(error => {
                this.setState({ errorMessage: ApiErrorHandler.GetGenericErrorMessage(error) });
                console.log(error);
            });
    }
    render() {
        return (
            <div className="jombotron">
                <div className="col-md-5">
                    <JobDetailComponent job={this.state.job} />
                    <div className="job-actions">
                        <button className="btn btn-danger " onClick={this.cancelJob}>Cancel job</button>
                        <button className="btn btn-primary" onClick={this._fetchJobInfo}>Refresh</button>
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