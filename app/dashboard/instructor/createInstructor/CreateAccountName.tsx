"use client"
import React from 'react'
interface CreateAccountNameProps{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}
const CreateAccountName:React.FC<CreateAccountNameProps> = ({onChange,defaultValue}) => {
  return (
    <div className='w-full space-y-4'>
      <div className="pb-4">
      <h1  className='block text-gray-700 dark:text-gray-200 text-lg sm:text-2xl font-medium mb-2'>
          What do you want to call your Account?
        </h1>
        <span className='text-sm text-gray-500 dark:text-gray-400'>By default, it uses your name.</span>
      </div>
        <input 
        defaultValue={defaultValue}
        onChange={onChange}
          type="text" 
          id="accountName" 
          className='w-full text-[16px] sm:text-xl px-4 border-[1.5px] bg-transparent py-2  dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
          placeholder="Enter your account name"
        />
    </div>
  )
}

export default CreateAccountName