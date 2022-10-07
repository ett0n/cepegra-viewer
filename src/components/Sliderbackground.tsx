import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import index from "../index.scss";

import axios from "axios";
  
// Data Non-Axios
import data from '../data.json';

  //AXIOS - OK ça tourne portugesh de mort 

  try {
    console.log("Ressource en ligne chargée avec succès");
    const response = await axios.get('https://jsonlaceholder.typicode.com/');    
  } catch (error) {
    const response = await axios.get('../data.json');
    console.log("MDR on charge le local")
    console.log(response);
    }

    const changeBackground = (ev: React.MouseEvent<HTMLAnchorElement>) => {

      // console.log("C clickay");
      // const url = ev.target.src
      // console.log(url);
      // document.body.style.backgroundImage = `url(${url})`
    }



const Sliderbackground = () => {
  return (
    <>
       <Swiper slidesPerView={3} spaceBetween={30} pagination={{
  "clickable": true
  
}} className="mySwiper">
  {data.resources.map((resource, index) => (
        <SwiperSlide key={index}><a onClick={changeBackground}
        data-url={resource.imageUrl} className="cursor-pointer"><img src={resource.imageUrl || ''} alt="ffkeofk"></img></a></SwiperSlide>
      ))}
        </Swiper>
    </>
  )
}

export default Sliderbackground