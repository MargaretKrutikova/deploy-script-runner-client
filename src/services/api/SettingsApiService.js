import axios from 'axios';
import ApiErrorHandler from './ApiErrorHandler';
import { GetApiUrl } from './ApiUrl';

const settingsEndpoint = `${GetApiUrl()}api/settings`;
const groupEndpoint = `${settingsEndpoint}/groups`;

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

  GetGroups = () => {
    const getGroupsPromise = new Promise((resolve, reject) => {
      axios.get(groupEndpoint)
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetGenericErrorMessage(error));
          });
    });

    return getGroupsPromise;
  }
}

export default new SettingsApiService();