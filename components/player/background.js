import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import vignette from "../../public/vignette.png";
import lines from "../../public/lines.jpg";

const REMOTE_BG = "https://raw.githubusercontent.com/MohamudMussa/quran-cafe/master/public/meccaanime.jpeg";
const LOCAL_BG = "/meccaanime.jpeg";

function Background({ isTuning = false }) {
  const [bgUrl, setBgUrl] = useState(REMOTE_BG);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgUrl(LOCAL_BG);
    img.src = LOCAL_BG;
  }, []);

  return (
    <>
      <motion.div id="retro-bg-root" className="retro-bg-root">
        {/* Blurred cover to fill edges */}
        <div className="retro-bg-base-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
        {/* Actual full image, contained */}
        <div className="retro-bg-base-contain" style={{ backgroundImage: `url(${bgUrl})` }} />
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
