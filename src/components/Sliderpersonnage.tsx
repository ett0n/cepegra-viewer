import React, { useEffect, useRef, useState } from "react";
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
import data from "../data.json";
import dataChar from "../data-char.json";
import { Hero } from "./Hero";
import { userInfo } from "os";

const Sliderpersonnage = () => {
  // INIT
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  const [getCharacters, setCharacters] = useState<Object[]>([])

  // REACTION
  const FetchCharacterApi = async () => {
    await axios
      .get(
        `http://api.xrlab.cepegra.be/api/appusers/${userInfo.id}?populate[characters][populate][accessories][populate]=*`
      )
      //if API down
      .catch((error: string) => {
        console.log("apidown or wrong id", error);
      })
      .then((response: any) => {
        setCharacters(response.data.data.attributes.characters.data)
      });
  };

  useEffect(() => {
    FetchCharacterApi()
  }, [])

  const [getIndexCharacter, setIndexCharacter] = useState(0)

  // RENDER
  return (
    <section className="border-2 border-red-700 h-2/3">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper my-auto h-full"
      >
        {/* {getCharacters.map((resource, index) => ( */}
          <SwiperSlide>
            <button style={{backgroundColor: "red"}} onClick={() => setIndexCharacter(getIndexCharacter-1)}>-</button>
            <Hero idUser={userInfo.id} indexCharacter={getIndexCharacter} />
            <button style={{backgroundColor: "red"}} onClick={() => setIndexCharacter(getIndexCharacter+1)}>+</button>
          </SwiperSlide>
        {/* ))} */}
      </Swiper>
    </section>
  );
};

export default Sliderpersonnage;
