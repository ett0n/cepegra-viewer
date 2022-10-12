import { useGLTF } from "@react-three/drei";
import { Hero } from "../components/Hero";

const HomeScreen = () => {
  /* ---- INIT ---- */
  //state
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  //defining character GLB
  const character = useGLTF("/assets/character/character.glb");

  /* ---- REACT ---- */

  /* ---- RENDER ---- */
  return (
    <main>
      <section className="border-2 border-red-700 h-2/3">
        {userInfo !== null && <Hero idUser={userInfo.id} />}
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
