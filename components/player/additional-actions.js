import fscreen from 'fscreen';
import AdditionalActionItem from "./additional-action-item";
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen, MdContactSupport } from "react-icons/md";
import { AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";
import React from 'react';

function AdditionalActions({
  onShuffleClick,
  onBackgroundShuffleClick,
  appElement,
  toggleFullscreen,
  inFullscreenMode
  // onVignetteClick,
  // toggleVideo,
}) {
  const socialShareText = "I'm currently listening to Quran on @QuranCafe and you should too! https://quran.cafe/";
  const socialShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialShareText)}`
  const contactLink = "https://twitter.com/QuranCafe";

  // Items to be displayed in the additional actions menu
  let items = [

    {
      text: "Twitter",
      link: socialShareLink,
      icon: <AiOutlineTwitter size={22} />
    },
    {
      text: "Facebook",
      link: socialShareLink,
      icon: <AiFillFacebook size={22} />
    }, {
      text: "Contact",
      link: contactLink,
      icon: <MdContactSupport size={23} />
    }
  ]

  return (
    <div className="absolute top-0 md:top-5 right-0 md:right-5 flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleFullscreen}
          className='mb-1'
          disabled={!fscreen.fullscreenEnabled}
        >
          {(!fscreen.fullscreenEnabled && 'Fullscreen Is Not Available') ||
            (inFullscreenMode && <MdOutlineCloseFullscreen size={22} />) ||
            <MdOutlineOpenInFull size={22} />}
        </button>
        {items.map((item, index) => (
          <AdditionalActionItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default AdditionalActions;
