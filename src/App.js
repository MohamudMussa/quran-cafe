import './App.css';
import './index.css';
import bg from './images/darker.jpg'
import bgtwo from './images/oldmecca.jpg'
import bgthree from './images/oldmadinatwo.jpg'
import mecca from './images/meccanew.jpg'
import ReactPlayer from 'react-player/youtube'
import { useEffect, useState } from 'react';


function App() {

  const [isPlaying, setIsPlaying] = useState(true)

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


      <div class="absolute top-0 left-0 right-9 flex items-center justify-between p-4">
        <div class="relative -top-0.5">
          <div class="flex items-center space-x-1">
            <span class="text-xs">
              Online
            </span>

          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen ">
        <div class="text-center lg:w-2/3 w-full">
          <button
            class="text-6xl text-center  font-mono text-white-500 "
            onClick={() => setIsMuted(false)}> Click here to start </button>


          <p class="leading-relaxed mb-8">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
          <div class="flex justify-center">
            <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
            <button class="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
          </div>
        </div>

      </div>



      <div
        id='vignette'
        style={{
          backgroundImage: `url('${darker}')`,
          backgroundSize: "cover",
          opacity: "0.7"

        }}>

        <div
          id='vin'>
          <div
            id='vignette'
            class="flex flex-col items-center md:h-screen md:justify-center px-4 py-16 md:py-0">

          </div>

        </div >

        <div>




          <ReactPlayer
            url='https://www.youtube.com/watch?v=bEGm_DHmiuk&list=PLxGJ20Im19wOWIfITK3KL69qm2j8kb3gI&ab_channel=%D9%85%D8%AD%D8%A8%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%85%D8%AD%D8%A8%D8%A7%D9%84%D8%AE%D9%8A%D8%B1'
            style={hiddenPlayer}
            playing={isPlaying}
            controls={false}
            // width="100vw"
            // height="200vw"
            muted={isMuted}
            volume={1}
            playsinline={true}
            onReady={() => { }}
            onPause={() => setIsPlaying(false)}

          />
        </div>
      </div>
    </div>


  );


}

export default App;
