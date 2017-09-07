import React from 'react';
import JobApiService from '../../services/api/JobApiService';

const JobActionsComponent = ({ jobId, getApiConfig, onActionCompleted, onError }) => {
  const refreshJob = () => {
    JobApiService.GetJob(jobId, getApiConfig())
          .then(job => onActionCompleted({ action: "UPDATED", job: job }))
          .catch(errorMessage => onError(errorMessage));
  }
  const cancelJob = () => {
    JobApiService.CancelJob(jobId, getApiConfig())
          .then(response => {
            refreshJob(jobId);
          })
          .catch(errorMessage => onError(errorMessage));
  }
  const removeJob = () => {
      JobApiService.RemoveJob(jobId, getApiConfig())
          .then(jobs => onActionCompleted({ action: "REMOVED" }))
          .catch(errorMessage => onError(errorMessage));
  }

  return (
    <div className="job-actions">
      <button data-toggle="tooltip" 
              title="refresh" 
              className="btn btn-primary btn-job-action" 
              onClick={refreshJob}>
          <span className="glyphicon glyphicon-refresh"></span>
          <span className="job-action-name">Refresh</span>
      </button>

      <button data-toggle="tooltip" 
              title="cancel" 
              className="btn btn-warning btn-job-action" 
              onClick={cancelJob}>
          <span className="glyphicon glyphicon glyphicon-alert"></span>
          <span className="job-action-name">Cancel</span>
      </button>
      
      <button data-toggle="tooltip" 
              title="remove" 
              className="btn btn-danger btn-job-action" 
              onClick={removeJob}>
          <span className="glyphicon glyphicon-remove"></span>
          <span className="job-action-name">Remove</span>
      </button>
    </div>
  );
}

export default JobActionsComponent;