import React from 'react';
import {
  TelegramIcon,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from 'react-share';

interface CustomShareButtonProps {
  url: string;
  quote: string;
  hashtag: string;
}

const ShareSocialMedia = () => {
  const shareUrl = 'https://www.pakkamarwadi.tk/';
  const commonProps: CustomShareButtonProps = {
    url: shareUrl,
    quote: 'Title or jo bhi aapko likhna ho',
    hashtag: '#portfolio...',
  };

  return (
    <div
      style={{
        background: '#0000',
        height: '100vh',
        width: '100%',
      }}
    >
      <h1 className='text-lg'>I hope you like it</h1>
      <TelegramShareButton {...commonProps}>
        <TelegramIcon size={40} round={true} />
      </TelegramShareButton>

      <FacebookShareButton {...commonProps}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton {...commonProps}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareSocialMedia;
