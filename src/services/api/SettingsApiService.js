import axios from 'axios';
import ApiErrorHandler from './ApiErrorHandler';
import { GetApiUrl } from './ApiUrl';

const settingsEndpoint = `${GetApiUrl()}api/settings`;
const projectEndpoint = `${settingsEndpoint}/projects`;

class SettingsApiService {
  ReloadSettings = (authConfig) => {
    const reloadSettingsPromise = new Promise((resolve, reject) => {
      axios.get(`${settingsEndpoint}/reload`, authConfig)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return reloadSettingsPromise;
  }

  GetProjects = () => {
    const getProjectsPromise = new Promise((resolve, reject) => {
      axios.get(projectEndpoint)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return getProjectsPromise;
  }
}

export default new SettingsApiService();