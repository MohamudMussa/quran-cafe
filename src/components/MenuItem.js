import * as React from "react";
import { motion } from "framer-motion";
// import { TwitterShareButton } from 'react-twitter-embed';


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


export const MenuItem = ({ i }) => {

    return (

        <motion.div
            className=" text-md  text-white font-mono "
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >

            {/* ABOUT ME ADDED
            <div className="icon-placeholder" >
                <h1 className="pb-3"> Quran Cafe ☕ </h1>

                <p className="pb-3"> Quran Cafe was made so that you could Study / Code while listening to a unique selections of Quran from all around the world.</p>

                <p className="pb-3">  Share your Quran playlist with us 🤍 and we'll add it to our stations </p>
                <a

                    style={{ color: 'gold' }} href="https://twitter.com/QuranCafe" rel="noreferrer">
                    DM @QuranCafe
                </a>
                <div className="pt-3"></div>
            </div>




            <svg
                className="pt-15"
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path className="change-my-color" d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z" /></svg>
            <p > Change Station </p>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path className="change-my-color" d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" /></svg>
            <p> Change Background </p>


            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path className="change-my-color" d="M19 8v8h-17v-8h17zm2-2h-21v12h21v-12zm1 9h.75c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25h-.75v6zm-16-6h-3v6h3v-6z" /></svg>
            <p > Remove Film Effect </p>


            <div className="icon-placeholder" >
                <h1 className="pt-20"> Share the reward </h1>
                <TwitterShareButton
                    url={'https://quran.cafe/'}
                    options={{ text: `I'm currently Listen to Quran on @QuranCafe and you should too!`, via: 'qurancafe' }}
                >
                </TwitterShareButton>


            </div>
 */}




        </motion.div>
    );
};
