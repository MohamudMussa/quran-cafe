import { motion } from "framer-motion";

import vignette from "../../public/vignette.png";
import newImage from "../../public/new.gif";

function Background({ buffering }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="vignette"
    >
      <div
        id="vin"
        style={{
          backgroundImage: `url(${vignette.src})`,
        }}
      >
        <div
          id="vignette"
          style={{
            backgroundImage: `url(${newImage.src})`,
          }}
          className="flex flex-col items-center md:h-screen md:justify-center px-4 py-16 md:py-0"
        />
      </div>

      <div>
        {buffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <h1 className="sm:text-xs text-3xl pb-2	text-center  font-mono  font-extrabold text-white-800 sm: text-md">
              Loading...
            </h1>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Background;
