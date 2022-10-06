
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

      console.log("C clickay");
      const url = ev.target
      console.log(url);
      document.body.style.backgroundImage = `url(${url})`
    }
    
  
  const Sliderpersonnage = () => {

    
    return (
      <>
      
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
        {data.resources.map((resource, index) => (
        <SwiperSlide key={index}><a onClick={changeBackground}
        data-url={resource.imageUrl} className="w-full cursor-pointer"><img src={resource.imageUrl || ''} alt="ffkeofk"></img></a></SwiperSlide>
      ))}
        </Swiper>
      </>
    );
  }



export default Sliderpersonnage