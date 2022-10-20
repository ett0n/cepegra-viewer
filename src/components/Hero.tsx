import { useGLTF, OrbitControls } from "@react-three/drei";
import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import type { Anchors } from "../types/Anchors";
import type { Character, AccessoriesStr } from "../types/Character";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

export const Hero = ({ idUser, indexCharacter, setIDCharacter, setIDAccessories}: { idUser: number; indexCharacter?: number; setIDCharacter: Function; setIDAccessories:Function;}) => {
  /* ---- INIT ---- */
  const [getRefresh, setRefresh] = useState(true)
  // Définition des ancres
  const anc: Anchors = {
    hats: [0, 0, 0],
    heads: [0, 0, 0],
    bodies: [0, 0, 0],
    hand_l: [0, 0, 0],
    foot_l: [0, 0, 0],
    foot_r: [0, 0, 0],
  };

  // Définition du glb du personnage
  const character = useGLTF("/assets/character/character.glb");

  // Accessoires actifs du personnage
  const [getAccessories, setAccessories] = useState<AccessoriesStr>({
    hat: null,
    head: null,
    body: null,
    hand_l: null,
    hand_r: null,
    feet: null,
    background: "/assets/accessories/backgrounds/sky-1.png",
  });

  // taille des accessoires des pieds
  const sX = 1;

  /* ---- REACT ---- */

  //pushing every chracter from API result in an array[] of Characters
  let characters: Character[] = [];

  // CALL API
  const FetchCharacterApi = async (idUser: number) => {
    await axios
      .get(`${import.meta.env.VITE_API}appusers/${idUser}?populate[characters][populate][accessories][populate]=*`)

      // Si api ne répond pas, catch erreur
      .catch((error: string) => {
        console.log("apidown or wrong id", error);
      })
      .then((response: any) => {
        console.log("Hero.tsx: API fetched");
        let characterResponse = response.data.data.attributes.characters.data;
        characterResponse.forEach((element: Character) => {
          characters.push(element);
        });
        // index du personnage
        let charNumber = indexCharacter == undefined ? characterResponse.length - 1 : indexCharacter;
        // ID du personnage
        setIDCharacter(characterResponse[charNumber].id)
        setIDAccessories(characterResponse[charNumber].attributes.accessories.id)
        //character[x].accessory_name
        let accessories = {
          hatN: characters[charNumber].attributes.accessories.hat.name,
          headN: characters[charNumber].attributes.accessories.head.name,
          bodyN: characters[charNumber].attributes.accessories.body.name,
          hand_lN: characters[charNumber].attributes.accessories.hand_l.name,
          hand_rN: characters[charNumber].attributes.accessories.hand_r.name,
          feet: characters[charNumber].attributes.accessories.feet.name,
          background:
            characters[charNumber].attributes.accessories.background.name,
        };

        // Mise à jour des accessoires du personnage venant de l'API
        setAccessories({
          hat:
            accessories.hatN !== null
              ? `/assets/accessories/hats/${accessories.hatN}/${accessories.hatN}.glb`
              : null,
          head:
            accessories.headN !== null
              ? `/assets/accessories/heads/${accessories.headN}/${accessories.headN}.glb`
              : null,
          body:
            accessories.bodyN !== null
              ? `/assets/accessories/bodies/${accessories.bodyN}/${accessories.bodyN}.glb`
              : null,
          hand_l:
            accessories.hand_lN !== null
              ? `/assets/accessories/hands/${accessories.hand_lN}/${accessories.hand_lN}.glb`
              : null,
          hand_r:
            accessories.hand_rN !== null
              ? `/assets/accessories/hands/${accessories.hand_rN}/${accessories.hand_rN}.glb`
              : null,
          feet:
            accessories.feet !== null
              ? `/assets/accessories/feet/${accessories.feet}/${accessories.feet}.glb`
              : null,
          background:
            accessories.background !== null
              ? `/assets/accessories/backgrounds/${accessories.background}.png`
              : `/assets/accessories/backgrounds/sky-1.png`,
        });
      });
  };

  // Fetch de l'API quand indexCharacter (boutons slides) change
  useEffect(() => {
    FetchCharacterApi(idUser);
  }, [indexCharacter])

  // Chargement du background
  const currentBackground = useLoader( TextureLoader, getAccessories.background! );

  // Composant d'un accessoire
  const Accessory = ({ src, clone, }: { src: string | null; clone?: boolean; }) => {
    if (src === null) return null;
    const gltf = useGLTF(src, true);
    if (clone) {
      return (
        <Suspense fallback={null}>
          <primitive object={gltf.scene.clone()} />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={null}>
          <primitive object={gltf.scene} />
        </Suspense>
      );
    }
  };

  /* ---- RENDER ---- */
  return (
    <>
      {/* Canvas accueillant le personnage en 3D */}
      <Canvas
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "1",
        }}
      >
        <mesh scale={100} position={[0, 0, 0]}>
          <meshStandardMaterial map={currentBackground} side={THREE.DoubleSide} />
          <sphereGeometry />
        </mesh>
        <ambientLight intensity={0.4} />
        <pointLight intensity={0.6} position={[0, 3, 3]} />
        <OrbitControls
          target={[0, 1.4, 0]}
          maxPolarAngle={1.45}
          enablePan={false}
          enableZoom={false}
          enableRotate={indexCharacter === undefined ? true : false}
        />
        <Suspense>
        <primitive object={character.scene}>
          <mesh position={anc.hats} scale={1}>
            <Accessory src={getAccessories.hat} />
          </mesh>
          <mesh position={anc.heads} scale={1}>
            <Accessory src={getAccessories.head} />
          </mesh>
          <mesh position={anc.bodies} scale={1}>
            <Accessory src={getAccessories.body} />
          </mesh>
          <mesh position={anc.hand_l} scale={1}>
            <Accessory src={getAccessories.hand_l} />
          </mesh>
          <mesh position={anc.hand_r} scale={1}>
            <Accessory src={getAccessories.hand_r} clone={true} />
          </mesh>
          <mesh position={anc.foot_l} scale={[sX, sX, sX]} rotation={[0, 0, 0]}>
            <Accessory src={getAccessories.feet} />
          </mesh>
          <mesh position={anc.foot_r} scale={[-sX, sX, sX]} rotation={[0, 0, 0]} >
            <Accessory src={getAccessories.feet} clone={true} />
          </mesh>
        </primitive>
        </Suspense>
      </Canvas>
    </>
  );
};