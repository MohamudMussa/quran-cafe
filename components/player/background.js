import { motion } from "framer-motion";

import vignette from "../../public/vignette.png";
import bgImage from "../../public/oldmecca.jpg";
import lines from "../../public/lines.jpg";

function Background() {
  return (
    <motion.div id="retro-bg-root" className="retro-bg-root">
      {/* Base image */}
      <div
        className="retro-bg-base"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      />

      {/* Warm tint */}
      <div className="retro-bg-tint" />

      {/* Scanlines */}
      <div
        className="retro-bg-scanlines"
        style={{ backgroundImage: `url(${lines.src})` }}
      />

      {/* Grain/Glitch layer */}
      <div className="retro-bg-grain" />

      {/* Vignette */}
      <div
        className="retro-bg-vignette"
        style={{ backgroundImage: `url(${vignette.src})` }}
      />
    </motion.div>
  );
}

export default Background;
