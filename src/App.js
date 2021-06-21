import './App.css';
import './index.css';
import meccaone from './images/darker.jpg'
import medina from './images/medina.jpg'
import meccatwo from './images/meccanew.jpg'

import five from './images/5.jpg'
import seven from './images/7.jpg'
import eight from './images/8.jpg'
import nine from './images/9.jpg'
import ten from './images/10.jpg'


import ReactPlayer from 'react-player/youtube'
import { Menu } from './components/Menu'
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"


const IMAGES = [
  meccaone,
  medina,
  meccatwo,
  five, seven, eight, nine, ten,
];

const STATION = [
  "hO5wCnVLHWU",
  "bEGm_DHmiuk&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=3&ab_channel=محبالخير",
  "Wmbt8a9RPrE&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=4&ab_channel=NaqaaStudio",
  "C2BMIMWnt-c&ab_channel=UniqueQuranUniqueQuran",
  "4ToJYAOQ-BE&t=19s&ab_channel=NaqaaStudio",
  "P00F8z6_9RI&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=8&ab_channel=muslim13100",
  "b5UU1xmiTmY&t=6s&ab_channel=UniqueQuran",
  "d-8Zho0kFEc&t=9s&ab_channel=UniqueQuran",
  "eIIGLkj2Bm0&t=12s&ab_channel=NaqaaStudio",
  "a41MKjpsH_c&t=11s&ab_channel=UniqueQuran",
  "pggcG0XwBTA&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&index=24&ab_channel=Muqbil",
  "JskuxU44UOw&t=20s&ab_channel=NaqaaStudio",
  "tRnuRmK9vuY",
  "P-H6XZvf7mM",
  "hATbP1aGSCc&t=3s&ab_channel=UniqueQuran", // Surah Ankabut
  "FDTkE9MI43k&t=7s",
  "0dzsXQb_MYc&t=7s",
  "Z9dz6_LybSU&t=39s&ab_channel=Beyzanishantasomali",
  "lD40MsqrI6I&ab_channel=HassanSaleh",
  "cFDYqgZhWmw&ab_channel=HassanMasoud",
  "0t9jEGXDaDA&t=20s&ab_channel=AbdalaShuraym",
  "x9xjKWePfAI&t=10s&ab_channel=UniqueQuran",
  "cia8JLXLrvc&t=6s&ab_channel=UniqueQuran",
  "Y63kr37P7Gc&t=13s&ab_channel=PearlsOfKnowledge",
  "C-DezfgLumU&t=7s&ab_channel=UniqueQuran",
  "SD9-FFDcyTE&ab_channel=BouilleRochdiBouilleRochdi",
  "T6e_Nm6DvJM&ab_channel=tawus7691tawus7691",
  "Dp9qvYIMRTA&ab_channel=InkTVInkTV",
  "1tob6BxH474&ab_channel=InkTVInkTV",
  "8rshbLpiG9Y&t=27s&ab_channel=AlMadrasatuAlUmariyyah",
  "Q3d_jeHESck&t=27s&ab_channel=AlMadrasatuAlUmariyyah",
  "rT1SzQEcrxE&t=29s&ab_channel=AlMadrasatuAlUmariyyah",
  "f_zM7xEJfpQ&ab_channel=abdelmalikabouaichaabdelmalikabouaicha",
  "JaXYk15stts&ab_channel=MuqbilMuqbil",
  "lb0WZRCoMcA&ab_channel=MuqbilMuqbil",
  "lbjaMn7X6YI&t=8s&ab_channel=TvIslaamaa",
  "lBGgXfGH2go&ab_channel=MunaSaeedMunaSaeed",
  "4miSBhRiem4&ab_channel=agentlightning",
  "qAIlNvErZFY&ab_channel=AliAlotaibi",
  "Oh01qYCzVE4&t=10s&ab_channel=abdirahmanNuurJimcaale",
  "CiFAr86BS-Q&t=2s&ab_channel=MinarMedia",
  "9S6QNq6pRHs&ab_channel=Saiditaraالقارئسعيدإتارى",
  "0xpB_48uswg&ab_channel=DailyIslamicBenefits",
  "Lg7SPMXiG14&ab_channel=TaleexWacaan",
  "L1AUa1uzT6k&ab_channel=Amer-AlKadhmayعامرالكاظمي",
  "NIoY0SJIycM&t=7s&ab_channel=TheQuranProject",
  "Jb22cetMpzA&t=6s&ab_channel=shahidaxD",
  "nxyueNqrhLk&t=45s&ab_channel=SalaamStudio",
  "v5Yqe9jFYO0&t=65s&ab_channel=AlFurqanCentre%28MasjidAlFurqan%29",
  "ulZXOfJbDdQ&ab_channel=husseinaliraqi",
  "dOW0pVnaor4&t=10s&ab_channel=IbrahimAdhhamAli",
  "YzrOf0yH5qs&t=5s&ab_channel=ORIGINALTAWHEED",
  "ZE2zxM8Fl5k&t=12s&ab_channel=Zaitoon55",
  "rVUDMw6IIzk&t=3s&ab_channel=HolyQuran",
  "52ysVzk_U-E&t=10s&ab_channel=AlMaxabbah",
  "H2qqrfRSALw&ab_channel=TaleexWacaan",
  "iWqy1pXcndg&t=13s&ab_channel=ALBAYAANUK",
  "6ABibmGp3Ik&t=16s&ab_channel=SheikhHassanAl-waajidiOfficialChannel",
  "G3u-MHPqZZw&ab_channel=السنيةالسلفية",
  "Lg7SPMXiG14",
  "_q6TJD0ttO4&t=5s",
  "JDsfr0d-8jM",
  "srCy6oxNbYs&t=4s",
  "NUXJz8UL_p8&t=8s",
  "-l0I8Uak-IQ",
  "bdi877qwKgM&t=33s",




];


function App() {

  const getImage = () => {
    const number = Math.floor(Math.random() * IMAGES.length);
    // console.log(number);
    return IMAGES[number];
  };

  const [activeImage, setActiveImage] = useState(IMAGES[0]);

  const [isBuffering, setIsBuffering] = useState(true)

  const handleClick = () => {
    const image = getImage();
    setActiveImage(image);
  };

  // STATION

  const getStation = () => {

    const numberStation = Math.floor(Math.random() * STATION.length);
    // console.log(numberStation);
    return STATION[numberStation];
  };

  const [station, setStation] = useState(STATION[0])


  const handleNext = () => {
    const station = getStation();
    const wallpaper = getImage();
    setActiveImage(wallpaper);
    setStation(station);
  };

  const shuffleOnEnd = () => {
    const station = getStation();

    setStation(station);
  };






  const [volume, setVolume] = useState(0.2)

  const [isPlaying, setIsPlaying] = useState(false)

  const [isMuted, setIsMuted] = useState(true)


  const hiddenPlayer = {
    pointerEvents: "none",
    userSelect: "none",
    position: "fixed",
    top: "100%",
    left: "100%",
  };

  const removeGif = () => {

    //get the elemnt by the following ID 
    var elem = document.getElementById('vignette');

    if (typeof elem == 'undefined' || elem == null) {
      document.getElementById('normal').id = 'vignette';
      document.getElementById('normal').id = 'vignette';
    }
    else {
      document.getElementById('vignette').id = 'normal';
      document.getElementById('vignette').id = 'normal';
    }
  }


  useEffect(() => {

    const station = getStation();
    const wallpaper = getImage();
    setActiveImage(wallpaper);
    setStation(station);


  }, [])


  return (

    <div className="min-h-screen"

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

            {/* NEXT AND PREVIOUS BUTTONS */}

            {/* <motion.button
                className="pr-4"
                onClick={() => setStation(station - 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 16v-8l6 4-6 4zm6 0v-8l6 4-6 4z" /></svg>
              </motion.button>


              <motion.button
                className="pr-4"
                onClick={() => setStation(station + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M22 12c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm-22 0c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm11 0l6-4v8l-6-4zm-6 0l6-4v8l-6-4z" /></svg>
              </motion.button> */}




            {/* HEART */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
          
              </svg> */}






          </div>

        </div>

      </motion.div>

      <div className="absolute top-0 left-0 right-9 flex items-center justify-between p-4">

        <button

        >
        </button>
        <div className="relative -top-0.5">
          <div className="flex items-center space-x-1">


            <motion.button
              className="pr-2"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z" /></svg>
            </motion.button>

            <motion.button
              className="pr-2"
              onClick={handleClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 24 24"><path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" /></svg>
            </motion.button>



            <motion.button
              className="pr-2"
              onClick={removeGif}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M19 8v8h-17v-8h17zm2-2h-21v12h21v-12zm1 9h.75c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25h-.75v6zm-16-6h-3v6h3v-6z" /></svg>
            </motion.button>


            <div></div>

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

          {isBuffering === true && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >

              <h1
                className="text-3xl pb-2	text-center  font-mono  font-extrabold text-white-800"
              > Loading... </h1>
            </motion.div>
          )}




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
            onEnded={() => shuffleOnEnd()}
            onError={() => shuffleOnEnd()}
            onBuffer={() => setIsBuffering(true)}
            onReady={() => setIsBuffering(false)}
            onBufferEnd={() => setIsBuffering(false)}

          />
        </div>



      </motion.div>
      <Menu />
    </div >


  );


}

export default App;
