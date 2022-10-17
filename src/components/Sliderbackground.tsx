// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import index from "../index.scss";
import { Pagination, Navigation } from "swiper";

import axios from "axios";
  
// Data Non-Axios
import data from '../data.json';

  //AXIOS - OK ça tourne portugesh de mort 

  // try {
  //   console.log("Ressource en ligne chargée avec succès");
  //   const response = await axios.get('http://xrlab.cepegra.be:1337/api/appusers?populate=*');    
  // } catch (error) {
  //   const response = await axios.get('../data.json');
  //   console.log("MDR on charge le local")
  //   console.log(response);
  //   }
    





const Sliderbackground = ({getIndexCharacter}:{getIndexCharacter:number}) => {
  /* ---- INIT ---- */
  const [getBackgrounds, setBackgrounds]=useState([])
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  /* ---- REACT ---- */
  const GetBackgroundApi = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}accessories?populate=deep`);
      setBackgrounds(response.data.data[0].attributes.Category[5].Accessory)
    } catch (error) {
      console.log("ca crash")
  }

}
const changeBackground = (ev: React.MouseEvent<HTMLAnchorElement>) => {
  const name = ev.target.dataset.name
  console.log(`Changement du background "${name}" du personnage numero ${getIndexCharacter} de l'user ${userInfo.id}`)
}

useEffect(()=>{GetBackgroundApi()},[])
 /* ---- RENDER ---- */
  return (
    <>
       <div className='h-1/3'>
         <Swiper
         loop={true}
         navigation={true}
         modules={[Navigation]}
         spaceBetween={30}
         className="mySwiper flex flex-col justify-center">
           {getBackgrounds.map((bg, index) => (
          <SwiperSlide key={index}><a onClick={changeBackground}
          data-url={"/assets/accessories/backgrounds/"+bg.uid_name+".png"} className="cursor-pointer mx-auto h-36"><img src={"/assets/accessories/backgrounds/"+bg.uid_name+".png"} alt="ffkeofk" data-name={bg.uid_name}></img></a></SwiperSlide>
               ))}
          </Swiper>
       </div>
    </>
  )
}

export default Sliderbackground