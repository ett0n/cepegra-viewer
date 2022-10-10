import { useState } from "react";
import Sliderpersonnage from "./components/Sliderpersonnage";
import Sliderbackground from "./components/Sliderbackground";
import ArPersoOK from "./components/ArPersoOK";
import BallPit from "./components/BallPit";
import ReactDOM from 'react-dom';


import { Canvas } from '@react-three/fiber'
import { useGLTF, Box } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useHitTest } from '@react-three/xr'

function App() {
  return (
    <main>
       {/* <ARButton sessionInit={{ optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] }}/>
		    <Canvas>
			<ambientLight />
			<BallPit />
		</Canvas> */}
    <Sliderbackground></Sliderbackground>
    <Sliderpersonnage></Sliderpersonnage>
    </main>
  );
}

export default App;
