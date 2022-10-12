import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Hero } from "../components/Hero";

const HomeScreen = () => {
  //state
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  //defining character GLB
  const character = useGLTF("/assets/character/character.glb");

  //react

  //render
  return (
    <main>
      <section className="border-2 border-red-700 h-2/3">
        {userInfo !== null && (
          <Canvas>
            <ambientLight intensity={0.4} />
            <pointLight intensity={.6} position={[0, 3, 3]}/>
            <OrbitControls target={[0, 2, 0]} maxPolarAngle={1.45} enablePan={false} enableZoom={false}/>
            <Hero idUser={userInfo.id}/>
          </Canvas>
        )}
      </section>
      <section className="w-screen bottom-8 flex flex-col gap-8 h-1/3">
        <a className="shutter"></a>
        <button className="btn btn-ar">
          <i className="fa-solid fa-child-reaching"></i> Jouons
        </button>
      </section>
    </main>
  );
};

export default HomeScreen;
