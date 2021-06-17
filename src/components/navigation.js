import React, { useEffect, useState, createRef } from 'react'
import { Modal } from 'react-bootstrap'
import logo from '../images/new.png'
import axios from 'axios'
import { useScreenshot, createFileName } from "use-react-screenshot";
import { motion } from "framer-motion"




// import background from '../images/palmm.jpg'



import ReactPlayer from 'react-player'



import q from '../images/image2.jpg'

import a from '../images/image2.jpg'

import b from '../images/image3.jpg'


import c from '../images/image4.jpg'

import d from '../images/image5.jpg'

import e from '../images/pinkUs.jfif'

import f from '../images/image9.jfif'

import g from '../images/sunset.jfif'

import h from '../images/image99.jpg'

import i from '../images/image55.jpg'

import j from '../images/image66.jpg'

import k from '../images/image77.jpg'

import l from '../images/image88.jpg'


import v from '../images/image00.jpg'







const IMAGES = [
    q, a, b, c, d, e, f, g, h, i, j, k, l, v
];



const Ayah = () => {

    const getImage = () => {
        const number = Math.floor(Math.random() * 13) + 1;
        console.log(number);
        return IMAGES[number];
    };

    const [activeImage, setActiveImage] = useState(IMAGES[0]);

    const handleClick = () => {
        const image = getImage();
        setActiveImage(image);
    };


    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 10.0
    });

    const download = (image, { name = "img", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };

    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);






    const [ayah, setAyah] = useState([''])

    const [surah, setSurah] = useState([''])

    const [eng, setEng] = useState([''])

    const [audio, setAudio] = useState('')

    //audio fucntionality 
    const [play, setPlay] = useState(false)


    //Search Modal 

    const [smShow, setSmShow] = useState(false);
    // const handleClose = () => setSmShow(false);

    const [suraah, setSuraah] = useState('')
    const [aayah, setAayah] = useState('')



    //Random Ayah Gen
    let ayahNumb = Math.floor(Math.random() * 6236) + 1


    // const forward = () => {

    //   const forwardd = ayahNumb++

    //   console.log(forwardd)

    //   const aa = `https://api.alquran.cloud/ayah/${forwardd}/en.sahih`
    //   const bb = `https://api.alquran.cloud/ayah/${forwardd}`
    //   const cc = `http://api.alquran.cloud/v1/ayah/${forwardd}/ar.hudhaify`

    //   console.log(aa)


    //    axios.all([
    //     axios.get(aa),
    //     axios.get(bb),
    //     axios.get(cc)

    //   ])
    //   .then(axios.spread((aa,  bb, cc) => {
    //       setSurah(aa.data.data.surah);
    //       setEng(aa.data.data);
    //       setAyah(bb.data.data);
    //       setAudio(cc.data.data.audio)

    //     }, []))

    // }






    // random ayah gen
    const urlEnglish = `https://api.alquran.cloud/ayah/${ayahNumb}/en.sahih`
    const urlArabic = `https://api.alquran.cloud/ayah/${ayahNumb}`
    const ayahAudio = `https://api.alquran.cloud/v1/ayah/${ayahNumb}/ar.hudhaify`


    //Ayah Search

    const searchedAyah = `${suraah}:${aayah}`
    const searchedEnglish = `https://api.alquran.cloud/ayah/${searchedAyah}/en.sahih`
    const searchedArabic = `https://api.alquran.cloud/ayah/${searchedAyah}`
    const searchedAudio = `https://api.alquran.cloud/v1/ayah/${searchedAyah}/ar.hudhaify`




    const refreshPage = () => {
        axios.all([
            axios.get(urlArabic),
            axios.get(urlEnglish),
            axios.get(ayahAudio)

        ])
            .then(axios.spread((urlArabic, urlEnglish, ayahAudio) => {

                setSurah(urlArabic.data.data.surah);
                setEng(urlEnglish.data.data);
                setAyah(urlArabic.data.data);
                setAudio(ayahAudio.data.data.audio)

            }, []))

    }

    useEffect(() => {
        axios.all([
            axios.get(urlArabic),
            axios.get(urlEnglish),
            axios.get(ayahAudio)
        ])
            .then(axios.spread((urlArabic, urlEnglish, ayahAudio) => {

                setAudio(ayahAudio.data.data.audio)
                setAyah(urlArabic.data.data);
                setSurah(urlArabic.data.data.surah);
                setEng(urlEnglish.data.data);
            }))
    }, []);


    //search useEffect

    const print = () => {
        axios.all([
            axios.get(searchedArabic),
            axios.get(searchedEnglish),
            axios.get(searchedAudio)

        ])

            .then(axios.spread((searchedArabic, searchedEnglish, searchedAudio) => {

                setSurah(searchedArabic.data.data.surah);
                setEng(searchedEnglish.data.data);
                setAyah(searchedArabic.data.data);
                setAudio(searchedAudio.data.data.audio)




            }, []))


        setSmShow(false)
        setSuraah('')
        setAayah('')

    }




    return (


        <div ref={ref}
            class="flex items-center justify-center min-h-screen  "
            style={{
                backgroundImage: `url('${activeImage}')`,
                backgroundSize: "cover",

            }}>



            <motion.div
                initial={{ scale: 0 }}
                animate={{
                    scale: [0.5, 1.2, 1.2, 1, 1],
                }}
                transition={{ duration: 2 }} class="max-w-5xl  p-4 m-6  rounded-3xl shadow-xl  	" style={{ backgroundImage: `url('${activeImage}')` }}>


                <div class="bg-fixed">



                    <div class="flex flex-col space-y-4 h-full justify-between">

                        <div className="text-base text-1xl font-medium text-white text-center 	"> {surah.name}

                            <div className="font-mono text-base text-xs font-small text-white text-center	">  {surah.englishName} - {surah.englishNameTranslation}  </div>
                            <div class="pt-6"></div>

                            <div class="flex flex-col items-center md:items-start">

                                <div >


                                    <h2 class="text-base font-medium text-xl text-white	 text-center	"
                                        style={{ alignSelf: "center", writingDirection: "rlt" }}>   {ayah.text}      </h2>


                                    <div class="pt-6"></div>


                                    <h5 class="text-base  font-mono font-medium text-xs text-white	 text-center	"> - {eng.text ? eng.text : 'Click the refresh icon below to reveal an Ayah'}  </h5>



                                    <div class="pt-8"></div>
                                    <h1 class="text-center  font-mono text-xs text-center text-white	">  {surah.revelationType} Ayah </h1>


                                </div >



                            </div>
                            <h5 class="text-right pb-2.5  font-mono  text-xs text-white text-opacity-50	 text-center	"> - {surah.number}:{eng.numberInSurah} -   </h5>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }} type="button" class='pr-4' onClick={refreshPage}> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="white">
                                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                                </svg> </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                class='pr-4'


                                onClick={downloadScreenshot}> <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </motion.button>


                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }} class='pr-4' onClick={() => setSmShow(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.button>

                            <Modal
                                className="opacity-80 rounded-3xl shadow-xl "
                                size="sm"
                                keyboard="true"
                                show={smShow}
                                onHide={() => setSmShow(false)}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header
                                    closeButton>

                                    <img className="h-10 w-10  rounded-full" src={logo} alt="logo" />


                                    <Modal.Title
                                        class="pl-3 pt-1	 text-center font-mono text-md text-center text-black	"
                                    >
                                        Search for an Ayah
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>


                                    <lable
                                        class="text-black text-opacity-55 ... font-mono text-sm text-centre "
                                    >
                                        Surah Number
                                    </lable>
                                    <input
                                        placeholder="e.g Surah Fatiha would be 1"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                                        type="text"
                                        value={suraah}
                                        onChange={(e) => { setSuraah(e.target.value) }}


                                    />


                                    <div class="pt-6 ..." />

                                    <lable
                                        class="text-black text-opacity-55 ... font-mono text-sm text-centre "
                                    >
                                        Ayah Number
                                    </lable>
                                    <input type="text"
                                        class=" appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="e.g Ayah 2 of Surah Fatiha would be 2"
                                        value={aayah}
                                        onChange={(e) => { setAayah(e.target.value) }}

                                    />
                                    <div class="pt-6 ..." />





                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }} onClick={print}
                                        type="submit"

                                        className="py-9	group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    > <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg> </motion.button>





                                </Modal.Body>
                            </Modal>






                            {play === false && (
                                <motion.button
                                    class='pr-4'

                                    onClick={() => setPlay(true)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.button>

                            )}

                            {play === true && (
                                <motion.button
                                    class='pr-4'
                                    onClick={() => setPlay(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </motion.button>


                            )}


                            <motion.button

                                onClick={handleClick}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </motion.button>





                            <ReactPlayer
                                url={audio}
                                playing={play}
                                height={0}
                                width={0}
                                onEnded={() => setPlay(false)}

                            />






                            <p class="text-black text-opacity-25 ... font-mono text-sm text-centre ">Aayah.app</p>


                        </div>


                    </div>


                </div>
            </motion.div>
        </div>
    )
}

export default Ayah
