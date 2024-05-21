"use client"
import React from 'react';
interface CreateTitleProps{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CreateTitle:React.FC<CreateTitleProps> = ({onChange}) => {
  return (
    <div className='w-full space-y-4'>
      <div className="pb-4">
        <h1 className='block text-gray-700 dark:text-gray-200 text-lg sm:text-2xl font-medium mb-2'>
          Define Your Account Title
        </h1>
        <span className='text-sm text-gray-500 dark:text-gray-400'>Examples: Software Engineering, Nursing, Business...</span>
      </div>
      <input 
      onChange={onChange}
        type="text" 
        id="title" 
        className='w-full text-[16px] sm:text-xl px-4 border-[1.5px] bg-transparent py-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
        placeholder="Enter your account title"
      />
    </div>
  );
};

export default CreateTitle;
