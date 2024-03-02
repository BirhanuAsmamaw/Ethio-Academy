import React from 'react';
import {
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


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface CustomShareButtonProps {
  url: string;
  
}

const ShareSocialMedia:React.FC<CustomShareButtonProps> = ({url}) => {
 
  
  return (
    <div>
     <Dialog>
      <DialogTrigger asChild>
        <div className="hover:dark:bg-700 hover:bg-gry-200 font-bold p-2">
          <HiOutlineShare size={30}/>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <div className="flex flex-col gap-2 ">
        <TelegramShareButton url={url}>
        <TelegramIcon size={40} round={true} />
      </TelegramShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

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
