import { motion } from "framer-motion";
import MenuItem from "./menu-item";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ playlists }) => (
  <motion.ul variants={variants}>
    <MenuItem playlists={playlists} />
  </motion.ul>
);

export default Navigation;
