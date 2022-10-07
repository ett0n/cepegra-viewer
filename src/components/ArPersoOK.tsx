import { useState } from "react";
import { Canvas } from '@react-three/fiber'
import { useGLTF, Box } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useHitTest } from '@react-three/xr'

function LoadGLB() {
  const gltf = useGLTF('./assets/character/bestdubest.glb', true)
  return <primitive object={gltf.scene} />
}

const ArPersoOK = () => {
  return (
    <>
    <ARButton sessionInit={{ optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] }}/>
    <Canvas>
      <XR>
        <Controllers />
        <Hands />
        <mesh position={[0, 0, -10]} scale={1}>
          <LoadGLB />
          <meshBasicMaterial color="blue" />
        </mesh>
        <mesh>
          <meshBasicMaterial color="blue" />
        </mesh>
      </XR>
    </Canvas>
  </>
  )
}
export default ArPersoOK