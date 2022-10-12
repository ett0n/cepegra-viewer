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
  /* ---- INIT ---- */
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  const [getAmountCharacters, setAmountCharacters] = useState(0)
  const [getIndexCharacter, setIndexCharacter] = useState(0)

  /* ---- REACT ---- */
  // Récupération du nombre de personnage de l'utilisateur
  const FetchCharacterApi = async () => {
    await axios.get(`http://api.xrlab.cepegra.be/api/appusers/${userInfo.id}?populate[characters][populate][accessories][populate]=*`)
      .catch((error: string) => console.log("apidown or wrong id", error))
      .then((response: any) => setAmountCharacters(response.data.data.attributes.characters.data.length));
  };

  // FetchCharacterApi seulement au chargement du composant
  useEffect(() => {
    FetchCharacterApi()
  }, [])

  // change l'index du character à afficher
  const SelectIndexCharacter = (selection:string) => {
    if (selection === "next") {
      if(getIndexCharacter < getAmountCharacters - 1) {
        setIndexCharacter(getIndexCharacter + 1)
      }
    }
    if (selection === "previous") {
      if(getIndexCharacter > 0) {
        setIndexCharacter(getIndexCharacter - 1)
      }
    }
  }

  /* ---- RENDER ---- */
  return (
    <section className="border-2 border-red-700 h-2/3">
      
      <button style={{backgroundColor: "red", width: "2rem", borderRadius: "5px", margin: "1rem"}} onClick={() => SelectIndexCharacter("previous")}>&lt;</button>
      <button style={{backgroundColor: "red", width: "2rem", borderRadius: "5px", margin: "1rem"}} onClick={() => SelectIndexCharacter("next")}>&gt;</button>
      <Hero idUser={userInfo.id} indexCharacter={getIndexCharacter} />

    </section>
  );
};

export default Sliderpersonnage;
