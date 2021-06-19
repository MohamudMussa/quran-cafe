import * as React from "react";
import { motion } from "framer-motion";
import { TwitterShareButton } from 'react-twitter-embed';


const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }) => {
    const style = { border: `2px solid ${colors[i]}` };
    return (

        <motion.div
            className="text-white font-mono"
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >

            {/* ABOUT ME ADDED */}
            <div className="icon-placeholder" style={style}>
                <h1> Quran Cafe ☕ </h1>
                <br />
                <p> Quran Cafe was made so that you could Study / Code while listening to a large selection of Quran from all around the world.</p>
                <br />
                <p>  Share your Quran playlist with us 🤍 DM @QuranCafe </p>
                <br />
            </div>

            <div className="icon-placeholder" style={style}>
                <h1> Share the reward </h1>

                <TwitterShareButton
                    url={'https://quran.cafe/'}
                    options={{ text: `I'm currently Listen to Quran on @QuranCafe and you should too!`, via: 'qurancafe' }}
                >
                </TwitterShareButton>
            </div>


        </motion.div>
    );
};
