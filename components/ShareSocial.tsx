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

      <div className=" flex w-full items-center gap-x-1">
        <div className="w-full flex gap-x-2">
          <input type="text" className=' outline-none text-sm border-none drop-shadow-md bg-transparent  w-full select-all overflow-x-auto' value={url} readOnly/>
         

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
                  text-gray-500 dark:text-gray-400
                  hover:bg-gray-900/5
                  hover:dark:bg-gray-50/5"
                  > <IoCopyOutline size={20}/></button>
         }
        </div>
      
      <DialogTrigger asChild  >
        <button className="
        p-1 rounded-md
        text-gray-500 dark:text-gray-400
        hover:bg-gray-900/5
        hover:dark:bg-gray-50/5">
          <IoShareSocialOutline size={20}/>
        </button>
      </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[325px] bg-white dark:bg-gray-700 p-2 font-bold rounded-[10px]">
        <div className="flex flex-wrap gap-2 justify-center ">
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
