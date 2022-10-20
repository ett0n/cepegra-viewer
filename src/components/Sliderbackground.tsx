// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import axios from "axios";

const Sliderbackground = ({ getIndexCharacter, getAmountCharacters, getIDCharacter, getIDAccessories}: { getIndexCharacter: number|undefined; getAmountCharacters:number;getIDCharacter:Number;getIDAccessories:Number}) => {
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
    // const url = `https://api.xrlab.cepegra.be/api/characters/${getIDCharacter}?populate=deep`

    // console.table({
    //   "url": url,
    //   "getIDCharacter": getIDCharacter,
    //   "getIDAccessories": getIDAccessories,
    //   "ev.target.dataset.name": ev.target.dataset.name,
    // })

    // Object à modifier dans l'API
    const dataToPut = {
      "data": {
        "accessories": {
          "id": getIDAccessories,
          "background": {
            "name": ev.target.dataset.name
          }
        }
      }
    }

    // PUT API
    try {
      const result = axios.put(`https://api.xrlab.cepegra.be/api/characters/${getIDCharacter}?populate=deep`, dataToPut)
      console.log("PUT réussi")
    } catch(error) {
      console.error("PUT ERROR: ", error)
    }
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
