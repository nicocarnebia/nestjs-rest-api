import LoginResponse from '../../domain/LoginResponseDTO';
import httpClient from './httpClient';

export const login = async (username: string, password: string):Promise<LoginResponse> => {
  return httpClient
    .post('auth/login', {
      username,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token); //TODO: env variable
      }
      return response.data;
    });
};
