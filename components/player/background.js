import { motion } from "framer-motion";

import vignette from "../../public/vignette.png";
import bgImage from "../../public/meccanew.jpg";
import lines from "../../public/lines.jpg";

function Background({ isTuning = false }) {
  return (
    <motion.div id="retro-bg-root" className="retro-bg-root">
      <div className="retro-bg-base" style={{ backgroundImage: `url(${bgImage.src})` }} />
      <div className="retro-bg-tint" />
      <div className="retro-bg-scanlines" style={{ backgroundImage: `url(${lines.src})` }} />
      <div className="retro-bg-grain" />
      <div className="retro-bg-vignette" style={{ backgroundImage: `url(${vignette.src})` }} />

      {/* Tuning overlay when switching stations */}
      {isTuning && (
        <motion.div
          className="retro-tuning-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.55 }}
        />
      )}
    </motion.div>
  );
}

export default Background;
