import React from 'react';
import axios from 'axios';
import styles from './styles.css';

class JobComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = { job: {}, jobId: this.props.match.params.id };

        this._fetchJobInfo(this.props.match.params.id);
    }
    _fetchJobInfo = () => {
        axios.get(`/api/jobs/${this.state.jobId}`)
           .then(response => this.setState({ job: response.data }))
            .catch(error => {
                // TODO: error handling
                console.log(error);
            });
    }
    render() {
        return (
            <div className="jombotron col-md-5">
                <div className="panel panel-info jon-info-panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">Job info</h3>
                    </div>
  
                    <div className="panel-body job-info-panel-body list-group">
                        { this.state.id } 
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">Id:</span>
                            <span className="job-info-row__value">{this.state.job.id}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">Project:</span>
                            <span className="job-info-row__value">{this.state.job.project}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                              <span className="job-info-row__name">Service:</span>
                              <span className="job-info-row__value">{this.state.job.service}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">Status:</span>
                            <span className="job-info-row__value">{this.state.job.status}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">Current action:</span>
                            <span className="job-info-row__value">{this.state.job.currentAction}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">Error message:</span>
                            <span className="job-info-row__value">{this.state.job.errorMessage}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">Created time:</span>
                            <span className="job-info-row__value">{this.state.job.createdTime}</span>
                        </div>
                        <div className="job-info-row list-group-item">
                            <span className="job-info-row__name">End time:</span>
                            <span className="job-info-row__value">{this.state.job.endTime}</span>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this._fetchJobInfo}>Refresh</button>
            </div>
        );
    }
}

export default JobComponent;