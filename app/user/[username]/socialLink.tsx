import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';  // Assuming you're using react-icons or similar library

type SocialLinkProps = {
  url?: string;
  icon: IconType;  // Ensure the icon is typed correctly
  name: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({ url = "#", icon: Icon, name }) => {
  return (<Link href={url} className="flex gap-1
  text-gray-600 
  dark:text-gray-400 
  items-center
   text-center p-1
   hover:dark:bg-gray-700
   hover:text-gray-800
    no-underline
   hover:dark:text-gray-100
    hover:bg-gray-100
     transition-all
      duration-300
        font-mono
      text-[14px]
     rounded">
        <Icon size={16} />
        <span>{name}</span>
      </Link>
  
  );
};

export default SocialLink;
