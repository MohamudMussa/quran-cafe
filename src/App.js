import './App.css';
import './index.css';
import bg from './images/vignette.png'
import bgtwo from './images/oldmecca.jpg'
import bgthree from './images/oldmadinatwo.jpg'
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

    <div id="vintage">



      <div
        id='darken'
        className="flex items-center justify-center min-h-screen "
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
          opacity: "0.5"

        }}>

        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded z-40" alt="hero" src={bgtwo}></img>
          <div class="text-center lg:w-2/3 w-full">
            <button
              class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white"
              onClick={() => setIsMuted(false)}> Click here to start</button>


            <p class="leading-relaxed mb-8">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
            <div class="flex justify-center">
              <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Button</button>
            </div>
          </div>
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


  );


}

export default App;
