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
import data from "../data.json";

//AXIOS - OK ça tourne portugesh de mort

// try {
//   console.log("Ressource en ligne chargée avec succès");
//   const response = await axios.get('http://xrlab.cepegra.be:1337/api/appusers?populate=*');
// } catch (error) {
//   const response = await axios.get('../data.json');
//   console.log("MDR on charge le local")
//   console.log(response);
//   }

const Sliderbackground = ({
  getIndexCharacter,
}: {
  getIndexCharacter: number;
}) => {
  /* ---- INIT ---- */
  const [getBackgrounds, setBackgrounds] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  /* ---- REACT ---- */
  const GetBackgroundApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}accessories?populate=deep`
      );
      setBackgrounds(response.data.data[0].attributes.Category[5].Accessory);
    } catch (error) {
      console.log("ca crash");
    }
  };
  const changeBackground = async (ev: React.MouseEvent<HTMLAnchorElement>) => {
    // Récupération des données de l'API
    const dataAPI = await axios.get(
      `${import.meta.env.VITE_API}appusers/${
        userInfo.id
      }?populate[characters][populate][accessories][populate]=*`
    );

    // Nom du nouveau background
    const name = ev.target.dataset.name;

    // Modification du nom du background
    dataAPI.data.data.attributes.characters.data[getIndexCharacter].attributes.accessories.background.name = name;
    console.log(dataAPI.data.data.attributes.characters.data[getIndexCharacter].attributes.accessories.background.name)

    // ! Patch
    try {
      const result = await axios.put(`${import.meta.env.VITE_API}appusers/${userInfo.id}?populate[characters][populate][accessories][populate]=*`, dataAPI.data);
      console.log("BG API: ",result.data.data.attributes.characters.data[getIndexCharacter].attributes.accessories.background.name);
      console.log(`Background "${name}" appliqué au personnage [${getIndexCharacter}] de l'user ${userInfo.id}`);
    }
    catch (error){
      console.log(error)
    }


    
  };

  useEffect(() => {
    GetBackgroundApi();
  }, []);
  /* ---- RENDER ---- */
  return (
    <>
      <div className="h-1/3">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          spaceBetween={30}
          className="mySwiper flex flex-col justify-center"
        >
          {getBackgrounds.map((bg, index) => (
            <SwiperSlide key={index}>
              <a
                onClick={changeBackground}
                data-url={
                  "/assets/accessories/backgrounds/" + bg.uid_name + ".png"
                }
                className="cursor-pointer mx-auto h-36"
              >
                <img
                  src={
                    "/assets/accessories/backgrounds/" + bg.uid_name + ".png"
                  }
                  alt="ffkeofk"
                  data-name={bg.uid_name}
                ></img>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Sliderbackground;
