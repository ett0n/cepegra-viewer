import Sliderpersonnage from "../components/Sliderpersonnage";
import Sliderbackground from "../components/Sliderbackground";
import { useState } from "react";

const Customizer = ({getIDCharacter, setIDCharacter, getIDAccessories, setIDAccessories}:{setIDCharacter:Function;getIDCharacter:Number;getIDAccessories:Number;setIDAccessories:Function}) => {
  /* ---- INIT ---- */
  // State de l'index du personnage affiché. Requis pour Sliderbackground et Sliderpersonnage
  const [getIndexCharacter, setIndexCharacter] = useState(undefined)
  const [getAmountCharacters, setAmountCharacters] = useState(0);


  /* ---- RENDER ---- */
  return (
    <main>
      <Sliderpersonnage getIndexCharacter={getIndexCharacter} setIndexCharacter={setIndexCharacter} getAmountCharacters={getAmountCharacters} setAmountCharacters={setAmountCharacters} setIDCharacter={setIDCharacter} setIDAccessories={setIDAccessories}/>
      <Sliderbackground getIndexCharacter={getIndexCharacter} getAmountCharacters={getAmountCharacters} getIDCharacter={getIDCharacter} getIDAccessories={getIDAccessories}/>
    </main>
  );
};

export default Customizer;
