"use client"
import React, { useState } from 'react';
import {
  
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';
import { IoCheckmarkOutline, IoCopyOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";

import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface CustomShareButtonProps {
  url: string;
  
}

const ShareSocialMedia:React.FC<CustomShareButtonProps> = ({url}) => {
 
  const [copy, setCopy]=useState(false)
  return (
    <div>
     <Dialog >

     
      
      <DialogTrigger asChild  >
        <button className="
        p-1 rounded-md
        text-gray-700 dark:text-gray-200
        hover:bg-gray-900/5
        hover:dark:bg-gray-50/5">
          <IoShareSocialOutline size={26}/>
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[325px] bg-white dark:bg-gray-700 p-2 font-bold rounded-[10px]">
        
      <div className="w-full  mt-6 pt-10 text-gray-700 dark:text-gray-100 px-4 flex gap-x-2">
          <input type="text" className=' outline-none text-sm border-none drop-shadow-lg bg-transparent  w-full select-all overflow-x-auto' value={url} readOnly/>
         

         {copy?<button      
       className=' inline-flex gap-1 items-center py-1'>
        <IoCheckmarkOutline size={14}/>
        <span>Copied!</span></button>:
        <button
           onClick={()=>{
          navigator.clipboard.writeText(url);
          setCopy(true);
          setTimeout(()=>{
            setCopy(false)
          },3000)
        }}
                 className="
                  p-1 rounded-md
                  text-gray-600 dark:text-gray-200
                  hover:bg-gray-900/5
                  hover:dark:bg-gray-50/5"
                  > <IoCopyOutline size={22}/></button>
         }
        </div>
        <div className="flex flex-wrap gap-4 py-6 justify-center ">
        <TelegramShareButton url={url}>
        <TelegramIcon size={40} round={true} />
      </TelegramShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>


      <TwitterShareButton url={url}>
        <TwitterIcon size={40} round={true} />
      </TwitterShareButton>


      <WhatsappShareButton url={url}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>

        </div>
        
      </DialogContent>
    </Dialog>


    
      
    </div>
  );
};

export default ShareSocialMedia;
