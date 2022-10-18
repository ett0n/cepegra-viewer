import Sliderpersonnage from "../components/Sliderpersonnage";
import Sliderbackground from "../components/Sliderbackground";
import { useState } from "react";

const Customizer = () => {
  /* ---- INIT ---- */
  // State de l'index du personnage affiché. Requis pour Sliderbackground et Sliderpersonnage
  const [getIndexCharacter, setIndexCharacter] = useState(0)

  /* ---- RENDER ---- */
  return (
    <main>
      <Sliderpersonnage getIndexCharacter={getIndexCharacter} setIndexCharacter={setIndexCharacter}/>
      <Sliderbackground getIndexCharacter={getIndexCharacter}/>
    </main>
  );
};

export default Customizer;
