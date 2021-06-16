import LoginResponse from '../../domain/LoginResponseDTO';
import httpClient from './httpClient';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants/jwt'

export const login = async (username: string, password: string):Promise<LoginResponse> => {
  return httpClient
    .post('auth/login', {
      username,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.access_token) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.data.access_token);
      }
      return response.data;
    });
};
