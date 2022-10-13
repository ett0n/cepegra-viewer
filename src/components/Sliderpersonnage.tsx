
  import React, { useRef, useState } from "react";
  // Import Swiper React components
  import { Swiper, SwiperSlide } from "swiper/react";

  import axios from "axios";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  
  import index from "./index.scss";
  
  // import required modules
  import { Pagination, Navigation } from "swiper";

  // Data Non-Axios
import data from '../data.json';
import dataChar from '../data-char.json'

  //AXIOS - OK ça tourne portugesh de mort 

  const FetchData = async() => {   try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/');    
  } catch (error) {
    const response = await axios.get('../data.json');
    console.log("MDR on charge le local")
    console.log(response);
    }}

    const changeBackground = (ev: React.MouseEvent<HTMLAnchorElement>) => {
      const url = ev.target
      document.body.style.backgroundImage = `url(${url})`
    }
    
  
  const Sliderpersonnage = () => {

    
    return (
      <section className="border-2 border-red-700 h-2/3">
      
        <Swiper
          
          navigation={true}
          modules={[Navigation]}
          className="mySwiper my-auto h-full"
        >
        {dataChar.resources.map((resource, index) => (
        <SwiperSlide key={index}><a onClick={changeBackground}
        data-url={resource.imageUrl} className="cursor-pointer w-2/3 mx-auto mb-12"><img src={resource.imageUrl || ''} alt="ffkeofk"></img></a></SwiperSlide>
      ))}
        </Swiper>
      </section>
    );
  }



export default Sliderpersonnage