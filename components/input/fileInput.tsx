import Image from 'next/image';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface InputFileProps {
  register: any;
  required: boolean;
  errors: any;
  id: string;
  disabled?: boolean;
  onDrop: (acceptedFiles: File[]) => void;
}

const FileInput: React.FC<InputFileProps> = ({ register, required, errors, id, disabled, onDrop }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
    onDrop(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div {...getRootProps()} className="flex items-center justify-center w-full">
      
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {uploadedFile ? (
         
          <Image
          height={400}
          width={370}
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-4 h-4 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
          </div>
        )}
        <input
          {...getInputProps()}
          id={id}
          type="file"
          className={` ${errors[id] ? 'border border-rose-400' : ''}`}
          {...register(id, { required })}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default FileInput;
