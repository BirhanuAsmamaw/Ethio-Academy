import React from 'react';
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
import { HiOutlineShare } from "react-icons/hi";


import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface CustomShareButtonProps {
  url: string;
  
}

const ShareSocialMedia:React.FC<CustomShareButtonProps> = ({url}) => {
 
  
  return (
    <div>
     <Dialog >
      <DialogTrigger asChild  >
        <div className="
       text-xl
      
       dark:bg-gray-700 
       border
        bg-gray-100 
       border-gray-200 
       hover:border-blue-600 
       hover:text-blue-600 
       dark:border-gray-600
        px-3 py-2 rounded-[5px] 
       hover:dark:border-green-400 
       hover:dark:text-green-400 transition
        duration-300">
          <HiOutlineShare size={30}/>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px] bg-white dark:bg-gray-700 p-2 font-bold rounded-[10px]">
        <div className="flex flex-wrap gap-2 justify-center ">
        <TelegramShareButton url={url}>
        <TelegramIcon size={30} round={true} />
      </TelegramShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>


      <TwitterShareButton url={url}>
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>


      <WhatsappShareButton url={url}>
        <WhatsappIcon size={30} round={true} />
      </WhatsappShareButton>

        </div>
        
      </DialogContent>
    </Dialog>


    
      
    </div>
  );
};

export default ShareSocialMedia;
