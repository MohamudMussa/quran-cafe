import './App.css';
import './index.css';
import meccaone from './images/darker.jpg'
import medina from './images/medina.jpg'
import meccatwo from './images/meccanew.jpg'
import ReactPlayer from 'react-player/youtube'
import { useState } from 'react';
import { motion } from "framer-motion"


const IMAGES = [
  meccaone, medina, meccatwo,
];

const STATION = [
  "hO5wCnVLHWU", "bEGm_DHmiuk&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&ab_channel=%D9%85%D8%AD%D8%A8%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%85%D8%AD%D8%A8%D8%A7%D9%84%D8%AE%D9%8A%D8%B1", "C2BMIMWnt-c&ab_channel=UniqueQuranUniqueQuran",
];

function App() {

  const getImage = () => {
    const number = Math.floor(Math.random() * 3);
    console.log(number);
    return IMAGES[number];
  };

  const [activeImage, setActiveImage] = useState(IMAGES[0]);

  const handleClick = () => {
    const image = getImage();
    setActiveImage(image);
  };

  // STATION

  const getStation = () => {
    const numberStation = Math.floor(Math.random() * 3);
    console.log(numberStation);
    return STATION[numberStation];
  };

  const [station, setStation] = useState(STATION[0])


  const handleNext = () => {
    const station = getStation();
    setStation(station);
  };




  const [volume, setVolume] = useState(0.5)

  const [isPlaying, setIsPlaying] = useState(false)

  const [isMuted, setIsMuted] = useState(true)


  const hiddenPlayer = {
    pointerEvents: "none",
    userSelect: "none",
    position: "fixed",
    top: "100%",
    left: "100%",
  };




  return (

    <div

    >
      <motion.div className="flex py-16	 justify-center min-h-screen "
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}

      >
        <div className="text-center lg:w-2/3 w-full">
          <h1
            className="text-3xl text-center font-black font-extrabold	tracking-wide	 "

          >
            وَاِذَا قُرِئَ الۡقُرۡاٰنُ فَاسۡتَمِعُوۡا لَهٗ وَاَنۡصِتُوۡا لَعَلَّكُمۡ تُرۡحَمُوۡنَ‏  ۝ </h1>


          <p className="text-l py-2	text-center  font-mono  font-extrabold text-white-800 ">
            So when the Qur'an is recited, listen carefully to it, and keep silent so that you may, be shown mercy.
          </p>
          <p className="text-l pb-2	text-center  font-mono  font-extrabold text-white-800 ">
            [7:204]
          </p>
          <div className="flex justify-center">


            <motion.button
              className="pr-4"
              onClick={() => setVolume(volume + 0.2)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>
            </motion.button>

            {isPlaying === false && (
              <motion.button
                className="pr-4"
                onClick={() => setIsPlaying(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" /></svg>

              </motion.button>
            )}

            {isPlaying === true && (

              <motion.button
                className="pr-4"
                onClick={() => setIsPlaying(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17h-3v-10h3v10zm5-10h-3v10h3v-10z" /></svg>

              </motion.button>
            )}


            <motion.button
              className="pr-4"
              onClick={() => setVolume(volume - 0.2)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z" /></svg>
            </motion.button>


          </div>
        </div>

      </motion.div>

      <div className="absolute top-0 left-0 right-9 flex items-center justify-between p-4">
        <div className="relative -top-0.5">
          <div className="flex items-center space-x-1">

            <motion.button

              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 24 24"><path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" /></svg>
            </motion.button>

            <motion.button

              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z" /></svg>
            </motion.button>

          </div>
        </div>

      </div>





      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        id='vignette'
        style={{
          backgroundImage: `url('${activeImage}')`,
          backgroundSize: "cover",
          opacity: "0.7"

        }}>

        <div
          id='vin'>
          <div
            id='vignette'
            className="flex flex-col items-center md:h-screen md:justify-center px-4 py-16 md:py-0">

          </div>

        </div >

        <div>




          <ReactPlayer
            url={"https://www.youtube.com/watch?v=" + station}
            style={hiddenPlayer}
            playing={isPlaying}
            controls={false}
            width="100vw"
            height="200vw"
            muted={isMuted}
            volume={volume}
            playsinline={true}
            onPlay={() => setIsMuted(false)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </motion.div>
    </div >


  );


}

export default App;
