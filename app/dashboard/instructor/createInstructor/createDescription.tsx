"use client"
import TextEditor from '@/components/editor/editor';
import React from 'react';
interface CreateDescriptionProps{
  value:string;

  setValue:(value:string)=>void;
}
const CreateDescription:React.FC<CreateDescriptionProps> = ({value,setValue}) => {
  return (
    <div className='w-full space-y-4'>
      <div className="pb-4">
        <h1 className='block text-gray-700 dark:text-gray-200 text-lg sm:text-2xl font-medium mb-2'>
          Describe Your Account
        </h1>
        <span className='text-sm text-gray-500 dark:text-gray-400'>Inspire others with your expertise: your role, achievements, and passions...</span>
      </div>
      <TextEditor value={value} setValue={setValue}/>
    </div>
  );
};

export default CreateDescription;
