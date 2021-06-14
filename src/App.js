import './App.css';
import './index.css';
import bg from './images/test.jpg'
import bgtwo from './images/oldmecca.jpg'
import bgthree from './images/oldmeccatwo.jpg'
import ReactPlayer from 'react-player/youtube'
import { useState } from 'react';


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

    <div id='darken'>

      <div
        id="vintage"
        class="flex items-center justify-center min-h-screen "
        style={{
          backgroundImage: `url('${bgthree}')`,
          backgroundSize: "cover",

        }}>

        <div>
          <button
            class="font-mono text-5xl	..."
            onClick={() => setIsMuted(false)}> Click here to start</button>
        </div>


        <ReactPlayer
          url='https://youtu.be/UaMPoBQr7uA?t=789'
          style={hiddenPlayer}
          playing={isPlaying}
          controls="false"
          // width="100vw"
          // height="200vw"
          muted={isMuted}
          volume={1}
          playsinline={true}

        />



      </div >
    </div>

  );


}

export default App;
