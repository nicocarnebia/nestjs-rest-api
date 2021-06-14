import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterRequest from '../../domain/RegisterRequestDTO';

import RegisterResponse from '../../domain/RegisterResponseDTO';
import { signUp } from '../../services/api/user.service';

type OnSubmitEventData = {
  Username: string,
  Password: string,
  City: number,
  Name: string,
  Address: string,
}

const RegisterForm:React.FunctionComponent = () => {
    const [registerCallLoading, setRegisterCallLoading] = useState<boolean>(false);
    const [registerCallResponse, setRegisterCallResponse] = useState<RegisterResponse|null>(null);
    const [registerCallError, setRegisterCallError] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (evtData:OnSubmitEventData) => {
      const payload:RegisterRequest = {
        name: evtData.Name,
        username: evtData.Username,
        password: evtData.Password,
        address: evtData.Address,
        cityId: Number(evtData.City),
      }

      setRegisterCallError(false);
      setRegisterCallLoading(true);
      setRegisterCallResponse(null);

      signUp(payload)
        .then((response:RegisterResponse) => {
          setRegisterCallResponse(response);
        })
        .catch(err => {
          setRegisterCallError(err);
        })
        .finally(() => {
          setRegisterCallLoading(false);
        })
    };
    
    return (
      <div className='w-full lg:w-1/2 m-2 md:m-4 p-2 md:p-4 md:border border-1 border-gray-300 border-solid'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <p className='border-b border-gray-300 mb-2'>Register</p>
          <input 
            type='text' 
            placeholder='Name' 
            className='mt-2 border rounded-sm p-2 outline-none' 
            {...register('Name', {required: true, maxLength: 32})} 
          />
          {errors.Name?.type === 'required' && <span>Name is required</span>}
          <input 
            type='text' 
            placeholder='Username' 
            className='mt-2 border rounded-sm p-2 outline-none'
            {...register('Username', {required: true, maxLength: 32})} 
          />
          {errors.Username?.type === 'required' && <span>Username is required</span>}
          <input 
            type='password' 
            placeholder='Password' 
            className='mt-2 border rounded-sm p-2 outline-none'
            {...register('Password', {required: true, maxLength: 32})} 
          />
          {errors.Password?.type === 'required' && <span>Password is required</span>}
          <input
            type='text' 
            placeholder='Address' 
            className='mt-2 border rounded-sm p-2 outline-none'
            {...register('Address', {required: true, maxLength: 32})} 
          />
          {errors.Address?.type === 'required' && <span>Address is required</span>}
          <input 
            type='number' 
            placeholder='City' 
            className='mt-2 border rounded-sm p-2 outline-none'
            {...register('City', {required: true, maxLength: 32})} 
          />
          {errors.City?.type === 'required' && <span>City is required</span>}
          { registerCallLoading && <span>Loading...</span> }
          { registerCallError && <span className='text-red-700'>An error ocurred. Try Again later.</span> }
          { registerCallResponse && <span className='text-green-700'>Registered!</span> }
          <input type='submit' value='Sign up' className='bg-blue-700 p-2 text-white mt-4 cursor-pointer' />
        </form>
      </div>
    );
}

export default RegisterForm;
