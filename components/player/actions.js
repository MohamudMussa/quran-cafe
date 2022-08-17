import { motion } from "framer-motion";
import styles  from "./action.module.css";

function Actions({
  playing,
  handlePlay,
  handlePause,
  onPrevious,
  onSetLoop,
  onUpvote,
  onShuffle,
  voted,
  loop
}) {
  const disabledColor = "#000000";
  return (
    <div className={`flex justify-evenly ${styles.player}`}>
      <motion.button
        className="pr-4 z-40"
        onClick={onPrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="39" height="41" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_105_104)">
          <path d="M19.5001 34.1667L21.7914 31.7579L12.7239 22.2084L32.5001 22.2084L32.5001 18.7917L12.7239 18.7917L21.7914 9.2421L19.5001 6.83335L6.50012 20.5L19.5001 34.1667Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_105_104">
          <rect width="39" height="41" fill="white" transform="translate(39 41) rotate(-180)"/>
          </clipPath>
          </defs>
        </svg>
      </motion.button>

      <motion.button
        className="pr-4 z-40"
        onClick={onSetLoop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.6278 8.8355C31.5432 8.2465 31.5432 6.90813 30.6278 6.31913L23.5556 1.76902C22.5599 1.12844 21.25 1.8433 21.25 3.02721V12.1274C21.25 13.3113 22.5599 14.0262 23.5556 13.3856L30.6278 8.8355Z" fill={loop ? disabledColor : "white"}/>
          <path d="M3.53289 27.7939C2.61742 27.2049 2.61742 25.8665 3.53289 25.2775L10.6051 20.7274C11.6007 20.0868 12.9106 20.8017 12.9106 21.9856L12.9106 31.0858C12.9106 32.2697 11.6007 32.9846 10.6051 32.344L3.53289 27.7939Z" fill={loop ? disabledColor : "white"}/>
          <path d="M5.66663 16.0416V15.7916C5.66663 11.0972 9.47221 7.29163 14.1666 7.29163V7.29163H21.25" stroke={loop ? disabledColor : "white"} strokeWidth="2.9922" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26.9166 17.5001V17.7501C26.9166 22.4445 23.111 26.2501 18.4166 26.2501V26.2501H11.3333" stroke={loop ? disabledColor : "white"} strokeWidth="2.9922" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      </motion.button>

      {playing ? (
        <motion.button
          className="pr-4  z-40"
          onClick={handlePause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="33" height="34" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6.66663" y="5.25" width="10" height="31.5" rx="2" fill="white"/>
            <rect x="23.3334" y="5.25" width="10" height="31.5" rx="2" fill="white"/>
          </svg>

        </motion.button>
      ) : (
        <motion.button
          className="pr-4  z-40"
          onClick={handlePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.333252 0.75V25.25L18.6666 13L0.333252 0.75Z" fill="white"/>
          </svg>
        </motion.button>
      )}

      <motion.button
        className="pr-4  z-40"
        onClick={onShuffle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="34" height="35" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.6666 26.25C20.4324 26.25 18.3409 25.3496 16.7891 23.8214" stroke="white" strokeWidth="2.9922" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.1358 11.7425C8.20066 9.85851 5.60478 8.75006 2.83325 8.75006" stroke="white" strokeWidth="2.9922" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.0445 27.7939C32.96 27.2049 32.96 25.8665 32.0445 25.2775L24.9723 20.7274C23.9767 20.0868 22.6667 20.8017 22.6667 21.9856V31.0858C22.6667 32.2697 23.9767 32.9846 24.9723 32.344L32.0445 27.7939Z" fill="white"/>
          <path d="M22.6667 8.75006H22.3924C19.1331 8.75006 16.1997 10.7273 14.9769 13.7485L11.9399 21.2516C10.717 24.2728 7.7836 26.2501 4.52432 26.2501H2.83337" stroke="white" strokeWidth="2.9922" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M30.6279 10.2939C31.5433 9.70487 31.5433 8.3665 30.6279 7.7775L23.5557 3.2274C22.5601 2.58682 21.2501 3.30167 21.2501 4.48558V13.5858C21.2501 14.7697 22.5601 15.4846 23.5557 14.844L30.6279 10.2939Z" fill="white"/>
        </svg>
      </motion.button>

      <motion.button
        className="pr-4  z-40"
        onClick={onUpvote}
        disabled={voted}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="32" height="29" viewBox="0 0 32 29" fill={voted ? disabledColor : "none"} xmlns="http://www.w3.org/2000/svg">
          <path d="M27.8409 4.21018C27.1568 3.50949 26.3445 2.95365 25.4504 2.57442C24.5563 2.19519 23.598 2 22.6302 2C21.6625 2 20.7042 2.19519 19.8101 2.57442C18.916 2.95365 18.1037 3.50949 17.4195 4.21018L15.9996 5.66368L14.5798 4.21018C13.1978 2.7955 11.3234 2.00073 9.36905 2.00073C7.41466 2.00073 5.54031 2.7955 4.15835 4.21018C2.77638 5.62487 2 7.54359 2 9.54426C2 11.5449 2.77638 13.4637 4.15835 14.8783L5.57823 16.3318L15.9996 27L26.4211 16.3318L27.8409 14.8783C28.5254 14.178 29.0684 13.3464 29.4389 12.4312C29.8093 11.5159 30 10.535 30 9.54426C30 8.55356 29.8093 7.57258 29.4389 6.65734C29.0684 5.7421 28.5254 4.91054 27.8409 4.21018V4.21018Z" stroke={voted ? disabledColor : "white"} strokeWidth="2.9922" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
}

export default Actions;
