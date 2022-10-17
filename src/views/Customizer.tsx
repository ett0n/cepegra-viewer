import Sliderpersonnage from "../components/Sliderpersonnage";
import Sliderbackground from "../components/Sliderbackground";
import { useEffect, useState } from "react";
import axios from "axios";

const Customizer = () => {
  /* ---- INIT ---- */
  // State de l'index du personnage affiché. Requis pour Sliderbackground et Sliderpersonnage
  const [getIndexCharacter, setIndexCharacter] = useState(0)

  /* ---- REACT ---- */
  const patchTest = async () => {
    const obj = { "pages" : 400 }

    const result = await axios.patch("https://quentin-cepegra-default-rtdb.europe-west1.firebasedatabase.app/biblio/-N5iE0dtDPdyd37PDfpH/livres/-N5iFFv63luBcEkVL8_r.json", obj)

    console.log(result)
  }

  useEffect(() => {
    patchTest()
  }, [])

  /* ---- RENDER ---- */
  return (
    <main>
      <Sliderpersonnage getIndexCharacter={getIndexCharacter} setIndexCharacter={setIndexCharacter}/>
      <Sliderbackground getIndexCharacter={getIndexCharacter}/>
    </main>
  );
};

export default Customizer;
