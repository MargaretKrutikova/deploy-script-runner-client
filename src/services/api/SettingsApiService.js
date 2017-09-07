import axios from 'axios';
import ApiErrorHandler from './ApiErrorHandler';
import { GetApiUrl } from './ApiUrl';

const projectEndpoint = `${GetApiUrl()}api/settings/projects`;

class SettingsApiService {
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