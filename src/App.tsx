import { useState } from "react";
import Sliderpersonnage from "./components/Sliderpersonnage";
import Sliderbackground from "./components/Sliderbackground";
import Artest from "./components/Artest";
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import BallPit from "./components/BallPit";

function LoadGLB() {
  const gltf = useGLTF('./public/assets/character/bestdubest.glb', true)
  return <primitive object={gltf.scene} />
}

function App() {
  return (
    
    <main>
 <>
      <ARButton sessionInit={{ optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] }}/>
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <mesh position={[0, 0, 0]} scale={0.008}>
            <LoadGLB />
            <meshBasicMaterial color="blue" />
          </mesh>
          <mesh>
            {/* <BallPit></BallPit> */}
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
      </Canvas>
    </>

    </main>
  );
}

export default App;
