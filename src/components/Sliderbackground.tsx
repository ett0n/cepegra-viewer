// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import axios from "axios";

const Sliderbackground = ({ getIndexCharacter, }: { getIndexCharacter: number; }) => {
  /* ---- INIT ---- */
  const [getBackgrounds, setBackgrounds] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);

  /* ---- REACT ---- */
  const GetBackgroundApi = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}accessories?populate=deep`);
      setBackgrounds(response.data.data[0].attributes.Category[5].Accessory);
    } catch (error) {
      console.log("ca crash");
    }
  };

  // Changement du background du personnage
  const ChangeBackground = async (ev: React.MouseEvent<HTMLAnchorElement>) => {
    
  };

  // Récupération des background au chargement du composant
  useEffect(() => {
    GetBackgroundApi();
  }, []);

  /* ---- RENDER ---- */
  return (
    <>
      <div className="h-1/3">
        <Swiper loop={true} navigation={true} modules={[Navigation]} spaceBetween={30} className="mySwiper flex flex-col justify-center" >
          {getBackgrounds.map((bg, index) => (
            <SwiperSlide key={index}>
              <a onClick={ChangeBackground} data-url={"/assets/accessories/backgrounds/" + bg.uid_name + ".png"}className="cursor-pointer mx-auto h-36">
                <img src={ "/assets/accessories/backgrounds/" + bg.uid_name + ".png" } alt="background" data-name={bg.uid_name} ></img>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Sliderbackground;
