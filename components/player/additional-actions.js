import { motion } from "framer-motion";
import AdditionalActionItem from "./additional-action-item";

function AdditionalActions({
  onShuffleClick,
  onBackgroundShuffleClick,
  // onVignetteClick,
  // toggleVideo,
}) {
  const socialShareText = "I'm currently listening to Quran on @QuranCafe and you should too! https://quran.cafe/";
  const socialShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialShareText)}`
  const contactLink = "https://twitter.com/QuranCafe";
  return (
    <div className="absolute top-0 right-0 flex items-center justify-between p-4">
      <div className="relative -top-0.5">
        <div className="flex items-center space-x-1">
          <AdditionalActionItem link={socialShareLink} text="Share"/>
          <AdditionalActionItem link={contactLink} text="Contact"/>
        </div>
      </div>
    </div>
  );
}

export default AdditionalActions;
