import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '../../services/api/auth.service'

import LoginResponse from '../../domain/LoginResponseDTO';

type OnSubmitEventData = {
  Username: string,
  Password: string,
}

const LoginForm:React.FunctionComponent = () => {
    const [loginCallLoading, setLoginCallLoading] = useState<boolean>(false);
    const [loginCallResponse, setLoginCallResponse] = useState<LoginResponse|null>(null);
    const [loginCallError, setLoginCallError] = useState<boolean>(false);


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (evtData: OnSubmitEventData) => {
      setLoginCallLoading(true);
      setLoginCallError(false);
      setLoginCallResponse(null);

      login(evtData.Username, evtData.Password)
        .then((response:LoginResponse) => {
          setLoginCallResponse(response);
        })
        .catch(err => {
          setLoginCallError(err);
        })
        .finally(() => {
          setLoginCallLoading(false);
        })
    }
    
    return (
      <div className='w-full lg:w-1/2 m-2 md:m-4 p-2 md:p-4 md:border border-1 border-gray-300 border-solid'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' >
          <p className='border-b border-gray-300 mb-2'>Login</p>
          <input 
            type='text' 
            placeholder='Username'
            className='mt-2 border rounded-sm p-2 outline-none'
            {...register('Username', {required: true, maxLength: 80})} />
          {errors.Username?.type === 'required' && <span>Username is required</span>}
          <input 
            type='text'
            placeholder='Password'
            className='mt-2 border rounded-sm p-2 outline-none'
            {...register('Password', {required: true, maxLength: 100})} />
          {errors.Password?.type === 'required' && <span>Password is required</span>}
          { loginCallLoading && <span>Loading...</span> }
          { loginCallError && <span className='text-red-700'>Credentials are not valid.</span> }
          { loginCallResponse && <span className='text-green-700'>You are in!</span> }
          <input 
            disabled={loginCallLoading} 
            type='submit'
            value='Sign in'
            className='bg-blue-700 p-2 text-white mt-4 cursor-pointer'
          />
        </form>
      </div>
    );
}

export default LoginForm;
