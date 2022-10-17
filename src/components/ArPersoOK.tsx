

import { useEffect } from "react";
import "@google/model-viewer/dist/model-viewer";
import type from "../types/modelviewer";

const ArpersoOK = () => {
  // useEffect( () => {
  //   const modelViewer = document.querySelector('model-viewer')!;
  //   const errorMessage = document.querySelector("#error")!;
  //   errorMessage.innerHTML = JSON.stringify(modelViewer.canActivateAR)
  //   console.log("model-viewer can activate AR: " + modelViewer.canActivateAR);
  // }, [])
  // ⬆️ ceci était censé être un message d'erreur s'affichant quand l'AR n'est pas supporté. Cependant, le message d'erreur s'affiche même sur certains devices supportant l'AR


  return (
    <div className="App">

    <model-viewer src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
    poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
    alt="A 3D model of an astronaut"
    shadow-intensity="1"
    camera-controls
    auto-rotate ar ar-modes="webxr quick-look">
<button slot="ar-button" id="ar-button">
Voir en AR
</button>
{/* <div id="error" className="">`Erreur, il semble que votre appareil ne supporte pas l'AR`</div> */}
</model-viewer>
    </div>
  )
}
export default ArpersoOK
