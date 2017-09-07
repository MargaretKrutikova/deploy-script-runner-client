import axios from 'axios';
import { GetApiUrl } from './ApiUrl';
import ApiErrorHandler from './ApiErrorHandler';

const jobEndpoint = `${GetApiUrl()}api/jobs/`;

class JobApiService {
  _urlWithJobId = (jobId) => `${jobEndpoint}${jobId}`

  GetJob = (jobId, authConfig) => {
    const getJobPromise = new Promise((resolve, reject) => {
      axios.get(this._urlWithJobId(jobId), authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return getJobPromise;
  }

  StartJob = (project, service, authConfig) => {
    const startJobPromise = new Promise((resolve, reject) => {
      axios.post(jobEndpoint, { project, service }, authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return startJobPromise;
  }

  CancelJob = (jobId, authConfig) => {
    const cancelJobPromise = new Promise((resolve, reject) => {
      axios.put(this._urlWithJobId(jobId), { status: "CANCELLED" }, authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return cancelJobPromise;
  }

  RemoveJob = (jobId, authConfig) => {
    const removeJobPromise = new Promise((resolve, reject) => {
      axios.delete(this._urlWithJobId(jobId), authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return removeJobPromise;
  }

  RemoveJobs = (authConfig) => {
    const removeJobsPromise = new Promise((resolve, reject) => {
      axios.delete(jobEndpoint, authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return removeJobsPromise;
  }

  GetJobs = (authConfig) => {
    const getJobsPromise = new Promise((resolve, reject) => {
      axios.get(jobEndpoint, authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return getJobsPromise;
  }
}

export default new JobApiService();