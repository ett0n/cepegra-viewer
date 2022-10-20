import { useGLTF } from "@react-three/drei";
import { Hero } from "../components/Hero";


const HomeScreen = ({setIDCharacter, setIDAccessories, GoToAR}:{setIDCharacter:Function;setIDAccessories:Function, GoToAR: () => void; }) => {
  /* ---- INIT ---- */
  //state
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);

  /* ---- REACT ---- */


  /* ---- RENDER ---- */
  return (
    <main>
      <section className="h-2/3">
        {userInfo !== null && <Hero idUser={userInfo.id} setIDCharacter={setIDCharacter} setIDAccessories={setIDAccessories}/>}
      </section>
      <section className="w-screen bottom-8 flex flex-col gap-8 h-1/3 z-10" >
        <a className="shutter"></a>
        <button className="btn btn-ar" onClick={GoToAR}>
          <i className="fa-solid fa-child-reaching"></i> Jouons
        </button>
      </section>
    </main>
  );
};

export default HomeScreen;