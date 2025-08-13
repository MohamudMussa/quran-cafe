import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import vignette from "../../public/vignette.png";
import lines from "../../public/lines.jpg";

const LOCAL_BG_1 = "/meccaanime.jpeg"; // 16:9
const LOCAL_BG_2 = "/newimage.png";
const LOCAL_BG_3 = "/newbackground.png";
const REMOTE_BG_1 = "https://raw.githubusercontent.com/MohamudMussa/quran-cafe/master/public/meccaanime.jpeg";
const REMOTE_BG_2 = "https://raw.githubusercontent.com/MohamudMussa/quran-cafe/master/public/newimage.png";
const REMOTE_BG_3 = "https://raw.githubusercontent.com/MohamudMussa/quran-cafe/master/public/newbackground.png";

function Background() {
  const [bgUrl, setBgUrl] = useState(LOCAL_BG_1);

  useEffect(() => {
    // Pick one of the backgrounds on each refresh
    const choices = [LOCAL_BG_1, LOCAL_BG_2, LOCAL_BG_3];
    const chosen = choices[Math.floor(Math.random() * choices.length)];

    const fallback = chosen === LOCAL_BG_1 ? REMOTE_BG_1 : chosen === LOCAL_BG_2 ? REMOTE_BG_2 : REMOTE_BG_3;

    // Try chosen local; if it fails, fallback to remote equivalent
    const img = new Image();
    img.onerror = () => setBgUrl(fallback);
    img.onload = () => setBgUrl(chosen);
    img.src = chosen;
  }, []);

  return (
    <motion.div id="retro-bg-root" className="retro-bg-root">
      {/* Single cover layer to fill entire screen */}
      <div className="retro-bg-base-cover" style={{ backgroundImage: `url(${bgUrl})` }} />

      {/* CRT effects */}
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
