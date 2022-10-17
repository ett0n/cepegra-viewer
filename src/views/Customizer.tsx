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

    // Récupération des données de l'API
    const data = await axios.get("https://quentin-cepegra-default-rtdb.europe-west1.firebasedatabase.app/biblio/-N5iE0dtDPdyd37PDfpH/livres/-N5j_kvMJ6998x-NLvxD.json")

    // Modification
    data.data.pages = 2333

    // Patch des données
    const result = await axios.put("https://quentin-cepegra-default-rtdb.europe-west1.firebasedatabase.app/biblio/-N5iE0dtDPdyd37PDfpH/livres/-N5j_kvMJ6998x-NLvxD.json", data.data)

    console.log(result)
  }

  useEffect(() => {
    // patchTest()
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
