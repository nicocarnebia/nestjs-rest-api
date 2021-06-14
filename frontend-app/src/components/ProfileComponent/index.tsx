import React, { useState, useEffect } from 'react';

import { userProfile } from '../../services/api/user.service'
import UserProfileResponse from '../../domain/UserProfileResponseDTO';
import { useParams } from 'react-router-dom';


const Profile:React.FunctionComponent = () => {
    const [profileIsLoading, setProfileIsLoading] = useState<boolean>(false);
    const [profileCallResponse, setProfileCallResponse] = useState<UserProfileResponse|null>(null);
    const [profileCallError, setProfileCallError] = useState<boolean>(false);
    const params = useParams<{ userId: string, profileId: string }>();

    useEffect(() => {
      setProfileIsLoading(true);
      setProfileCallError(false);
      setProfileCallResponse(null);

      userProfile(Number(params.userId), Number(params.profileId))
        .then((response:UserProfileResponse) => {
          setProfileCallResponse(response);
        })
        .catch(err => {
          setProfileCallError(err);
        })
        .finally(() => {
          setProfileIsLoading(false);
        })
    },[params.userId, params.profileId])

    if (profileIsLoading) {
      return <span>Loading...</span>;
    }

    if (profileCallError) {
      return <span>Profile not found!</span>
    }
    
    return (
      <div className='w-full lg:w-1/2 m-2 md:m-4 p-2 md:p-4 md:border border-1 border-gray-300 border-solid'>
        <p>Profile ID: {profileCallResponse?.id}</p>
        <p>Name: {profileCallResponse?.name}</p>
        <p>Adress: {profileCallResponse?.address.street}</p>
        <p>City: {profileCallResponse?.address.city}</p>
        <p>Country: {profileCallResponse?.address.country}</p>
      </div>
    );
}

export default Profile;
