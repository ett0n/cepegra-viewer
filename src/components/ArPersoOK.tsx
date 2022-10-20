// @ts-nocheck

import { useEffect, useState } from "react";
import "@google/model-viewer/dist/model-viewer"; 
import index from "../index.scss";
import type from "../types/modelviewer";

const ArpersoOK = () => {
  let msg = useState(false)
  const modelViewer = document.querySelector('model-viewer')!;
  console.log(modelViewer)
  document.addEventListener('ar-status', (event) => {
    console.log("test",event)
  })
  useEffect( () => {
    const modelViewer = document.querySelector('model-viewer')!;
    msg = modelViewer.canActivateAR
    /*
    console.log(modelViewer.canActivateAR);
    const errorMessage = document.querySelector("#error")!;
    errorMessage.innerHTML = JSON.stringify(modelViewer.canActivateAR)
    console.log("model-viewer can activate AR: " + modelViewer.canActivateAR);
    */
  }, [])
  // ⬆️ ceci était censé être un message d'erreur s'affichant quand l'AR n'est pas supporté. Cependant, le message d'erreur s'affiche même sur certains devices supportant l'AR. Bonne chance pour débugg ça, on s'est arraché les cheveux (enfin surtout Alex)

  return (
    <div className="App">
    <model-viewer src="./assets/character/character-fake.glb"
    poster="./assets/img/poster.png"
    alt="A 3D model of an astronaut"
    shadow-intensity="1"
    camera-controls
    auto-rotate ar ar-modes="webxr quick-look" ar-status="">
{/*}    <Helmet>
    <script>
    <>const AR = document.querySelector("model-viewer");
console.log(AR.canActivateAR);
const polak = JSON.stringify(AR.ar-status);
console.log(polak);

if (AR.canActivateAR === false){
  alert("DEVICE NON COMPATIBLE")
} else{
  alert("L'AR est compatible avec ton device")
}</>
    </script>
  </Helmet> 
  <div id="error" ><h1>AR is not supported on this device</h1></div>
*/}
{/* <div id="error">{msg}</div> */}
<button slot="ar-button" id="ar-button">
Voir en AR
</button>
{/* <div id="error" className="">`Erreur, il semble que votre appareil ne supporte pas l'AR`</div> */}
</model-viewer>
    </div>
  )
}
export default ArpersoOK
