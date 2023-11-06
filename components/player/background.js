import { motion } from "framer-motion";

import vignette from "../../public/vignette.png";
import newImage from "../../public/new.gif";
// import rain from "../../public/rain.gif";

function Background() {
  return (
    <motion.div
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
          className="z-0 flex flex-col items-center md:h-screen md:justify-center px-4 py-16 md:py-0"
        />
      </div>
    </motion.div>
  );
}

export default Background;
