import { motion } from "framer-motion";

import vignette from "../../public/vignette.png";
import bgImage from "../../assets/images/GnIY3QCXQAAprad.jpeg";
import lines from "../../public/lines.jpg";

function Background({ isTuning = false }) {
  return (
    <>
      <motion.div id="retro-bg-root" className="retro-bg-root">
        <div className="retro-bg-base" style={{ backgroundImage: `url(${bgImage.src})` }} />
        <div className="retro-bg-tint" />
        <div className="retro-bg-scanlines" style={{ backgroundImage: `url(${lines.src})` }} />
        <div className="retro-bg-grain" />
        <div className="retro-bg-vignette" style={{ backgroundImage: `url(${vignette.src})` }} />
      </motion.div>

      {isTuning && (
        <motion.div
          className="retro-tuning-portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.55 }}
        >
          <div className="retro-tuning-overlay" />
        </motion.div>
      )}
    </>
  );
}

export default Background;
