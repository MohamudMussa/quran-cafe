import { motion } from "framer-motion";
import { AiOutlinePause, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { RxLoop, RxShuffle } from "react-icons/rx";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";


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
    <div className="flex justify-between ">
      <div className="flex rounded-md border-black">
        <motion.button
          className="px-4 z-40 border-2 border-r-0 rounded-tl-md rounded-bl-md border-black"
          onClick={onPrevious}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <BiSkipPrevious size={33} color="black" />
        </motion.button>

        <motion.button
          className="p-2 px-4 z-40 flex justify-center items-center border-2 border-black"
          onClick={onSetLoop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
        >
          <RxLoop size={21} color="black" />
        </motion.button>

        <motion.button
          className="p-1 px-4  z-40 flex justify-center items-center  border-2 border-l-0 border-black "
          onClick={playing ? handlePause : handlePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          {playing ? (

            <AiOutlinePause size={28} color="black" />
          ) : (<BsFillPlayFill size={28} color="black" />)}

        </motion.button>

        <motion.button
          className="p-2 px-4 z-40 flex justify-center items-center  border-2 border-l-0 rounded-tr-md rounded-br-md border-black"
          onClick={onShuffle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BiSkipNext size={33} color="black" />
        </motion.button>


      </div>
      <div>
        <motion.button
          className="p-2 pt-3 border-2 border-black rounded-md h-full z-40 "
          onClick={onUpvote}
          disabled={voted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          {
            voted ? <AiFillHeart size={24} color="black" /> : <AiOutlineHeart size={24} color="black" />
          }
        </motion.button>
      </div>
    </div>
  );
}

export default Actions;
