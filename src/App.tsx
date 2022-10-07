import { useState } from "react";
import Sliderpersonnage from "./components/Sliderpersonnage";
import Sliderbackground from "./components/Sliderbackground";
import ArPersoOK from "./components/ArPersoOK";
import BallPit from "./components/BallPit";
import ReactDOM from 'react-dom';

import { ARCanvas } from '@react-three/xr';

function App() {
  return (
    <main>
    		<ARCanvas
			sessionInit={{ requiredFeatures: ['hit-test'] }}
			pixelRatio={window.devicePixelRatio}>
			<ambientLight />
			<BallPit />
		</ARCanvas>
    </main>
  );
}

export default App;
