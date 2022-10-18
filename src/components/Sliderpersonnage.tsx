import { useEffect, useState } from "react";
import axios from "axios";
import { Hero } from "./Hero";

const Sliderpersonnage = ({getIndexCharacter,setIndexCharacter,getAmountCharacters, setAmountCharacters, setIDCharacter, setIDAccessories}: {getIndexCharacter: number|undefined;setIndexCharacter: Function; getAmountCharacters:number; setAmountCharacters:Function;setIDCharacter:Function;setIDAccessories:Function}) => {
  /* ---- INIT ---- */
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  const [getIdCharacters, setIdCharacters] = useState(0);

  /* ---- REACT ---- */
  // Récupération du nombre de personnage de l'utilisateur
  const FetchCharacterApi = async () => {
    await axios
      .get(`${import.meta.env.VITE_API}appusers/${userInfo.id}?populate[characters][populate][accessories][populate]=*`)
      .catch((error: string) => console.log("apidown or wrong id", error))
      .then((response: any) =>
        setAmountCharacters(response.data.data.attributes.characters.data.length)
      );
  };

  // FetchCharacterApi seulement au chargement du composant
  useEffect(() => {
    FetchCharacterApi();
  }, []);

  // change l'index du character à afficher au clique d'un bouton/slider
  const SelectIndexCharacter = (selection: string) => {
    if (selection === "next") {
      if (getIndexCharacter! < getAmountCharacters - 1) {
        setIndexCharacter(getIndexCharacter! + 1);
      } else {
        setIndexCharacter(0);
      }
    }
    if (selection === "previous") {
      if (getIndexCharacter! > 0) {
        setIndexCharacter(getIndexCharacter! - 1);
      } else {
        setIndexCharacter(getAmountCharacters! - 1);
      }
    }
  };

  /* ---- RENDER ---- */
  return (
    <section className="h-2/3">
      {/* Bouton personnage précédant */}
      <button className="swiper-button-prev" style={{ top: "45%" }} onClick={() => SelectIndexCharacter("previous")} ></button>

      {/* Bouton personnage suivant */}
      <button className="swiper-button-next" style={{ top: "45%" }} onClick={() => SelectIndexCharacter("next")} ></button>
      
      {/* Personnage */}
      <Hero idUser={userInfo.id} indexCharacter={getIndexCharacter} setIDCharacter={setIDCharacter} setIDAccessories={setIDAccessories}/>
    </section>
  );
};

export default Sliderpersonnage;
