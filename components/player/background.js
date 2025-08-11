import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import vignette from "../../public/vignette.png";
import lines from "../../public/lines.jpg";

const REMOTE_BG = "https://raw.githubusercontent.com/MohamudMussa/quran-cafe/master/public/meccaanime.jpeg";
const LOCAL_BG = "/meccaanime.jpeg";

function Background() {
  const [bgUrl, setBgUrl] = useState(REMOTE_BG);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setBgUrl(LOCAL_BG);
    img.src = LOCAL_BG;
  }, []);

  return (
    <motion.div id="retro-bg-root" className="retro-bg-root">
      <div className="retro-bg-base-cover" style={{ backgroundImage: `url(${bgUrl})` }} />

      {/* Constant CRT effects */}
      <div className="retro-scan-scroll" />
      <div className="retro-pixel-grid" />
      <div className="retro-chroma retro-chroma-r" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="retro-chroma retro-chroma-g" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="retro-chroma retro-chroma-b" style={{ backgroundImage: `url(${bgUrl})` }} />

      {/* Dark overlay */}
      <div className="retro-bg-darken" />

      {/* Existing overlays */}
      <div className="retro-bg-tint" />
      <div className="retro-bg-scanlines" style={{ backgroundImage: `url(${lines.src})` }} />
      <div className="retro-bg-grain" />
      <div className="retro-bg-vignette" style={{ backgroundImage: `url(${vignette.src})` }} />
    </motion.div>
  );
}

export default Background;
