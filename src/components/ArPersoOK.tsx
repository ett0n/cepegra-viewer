

import { useEffect } from "react";
import "@google/model-viewer/dist/model-viewer";
import {Hero} from "../components/Hero"
import type from "../types/modelviewer";

const ArpersoOK = () => {
  useEffect( () => {
    const modelViewer = document.querySelector('model-viewer')!;
    const errorMessage = document.querySelector("#error")!;
    errorMessage.innerHTML = JSON.stringify(modelViewer.canActivateAR)
    console.log("model-viewer can activate AR: " + modelViewer.canActivateAR);
  }, [])


  return (
    <div className="App">

    <model-viewer src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
    poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
    alt="A 3D model of an astronaut"
    shadow-intensity="1"
    camera-controls
    auto-rotate ar ar-modes="webxr quick-look">
<button slot="ar-button" id="ar-button">
Voir en AR BOllos
</button>
{/* <button properties="canActivateAR">COUP DE GENI</button> */}
<div id="error" className="">Nieu d'chance em bieau, chang eu't phone de brin</div>
</model-viewer>
    </div>
  )
}
export default ArpersoOK
