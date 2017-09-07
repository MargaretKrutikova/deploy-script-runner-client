import axios from 'axios';
import { GetApiUrl } from './ApiUrl';
import ApiErrorHandler from './ApiErrorHandler';

const authTokenEndpoint = `${GetApiUrl()}api/auth/token`;

class AuthApiService {
  Login = (userName, password) => {
    const loginPromise = new Promise((resolve, reject) => {
      axios.post(authTokenEndpoint, { userName, password })
          .then(response => resolve(response.data))
          .catch(error => {
              console.log(error);
              reject(ApiErrorHandler.GetLoginError(error));
          });
    });

    return loginPromise;
  }
}

export default new AuthApiService();