import { useState } from "react";
import Sliderpersonnage from "./components/Sliderpersonnage";
import Sliderbackground from "./components/Sliderbackground";
import Artest from "./components/Artest";
import { Canvas } from '@react-three/fiber'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import BallPit from "./components/BallPit";



function App() {
  return (
    
    <main>
 <>
      <ARButton sessionInit={{ optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] }}/>
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <mesh>
            <BallPit></BallPit>
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
      </Canvas>
    </>

    </main>
  );
}

export default App;
