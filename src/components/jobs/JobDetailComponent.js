import React from 'react';
import { } from './styles.css';

const JobDetailComponent = (props) => {
  return (
    <div className="panel panel-info jon-info-panel">
        <div className="panel-heading">
            <h3 className="panel-title">Job info</h3>
        </div>
        <div className="panel-body job-info-panel-body list-group">
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Id:</span>
                <span className="job-info-row__value">{props.job.id}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Project:</span>
                <span className="job-info-row__value">{props.job.project}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Service:</span>
                <span className="job-info-row__value">{props.job.service}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Status:</span>
                <span className="job-info-row__value">{props.job.status}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Current action:</span>
                <span className="job-info-row__value">{props.job.currentAction}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Error message:</span>
                <span className="job-info-row__value">{props.job.errorMessage}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">Created time:</span>
                <span className="job-info-row__value">{props.job.createdTime}</span>
            </div>
            <div className="job-info-row list-group-item">
                <span className="job-info-row__name">End time:</span>
                <span className="job-info-row__value">{props.job.endTime}</span>
            </div>
        </div>
      </div>
  );
}

export default JobDetailComponent;