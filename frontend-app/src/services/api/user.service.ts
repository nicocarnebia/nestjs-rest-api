import RegisterRequest from '../../domain/RegisterRequestDTO';
import RegisterResponse from '../../domain/RegisterResponseDTO';
import UserProfileResponse from '../../domain/UserProfileResponseDTO';
import httpClient from './httpClient';

export const signUp = 
  async (request:RegisterRequest):Promise<RegisterResponse> => (httpClient.post('users', request));

export const userProfile = 
  async (userId:number, profileId:number):Promise<UserProfileResponse> => { 
    return httpClient.get(`users/${userId}/profiles/${profileId}`).then((response) => {
      return response.data;
    })
  };