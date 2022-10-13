// @ts-nocheck
import React, { useRef, useState } from "react";
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
 const FetchData = async() => {   try {
      const response = await axios.get('./data.json');
    } catch (error) {
      console.log(e)
    }}

    const changeBackground = (ev: React.MouseEvent<HTMLAnchorElement>) => {
      const url = ev.currentTarget.dataset.url
      document.body.style.backgroundImage = `url(${url})`
    }



const Sliderbackground = () => {
  return (
    <>
       <div className='h-1/3'>
         <Swiper
         loop={true}
         navigation={true}
         modules={[Navigation]}
         spaceBetween={30}
         className="mySwiper flex flex-col justify-center">
           {data.resources.map((resource, index) => (
          <SwiperSlide key={index}><a onClick={changeBackground}
          data-url={resource.imageUrl} className="cursor-pointer mx-auto h-36"><img src={resource.imageUrl || ''} alt="ffkeofk"></img></a></SwiperSlide>
               ))}
          </Swiper>
       </div>
    </>
  )
}

export default Sliderbackground