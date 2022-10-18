// @ts-nocheck
/* ----------------------------------- Import ----------------------------------- */
import Axios from "axios";
import React, { useState, useEffect } from "react";

/* --------------------------------- Interfaces --------------------------------- */
interface UserInfo {
  id: number;
  pseudo: string;
}

/* ------------------------------------ App ------------------------------------ */
const Accueil = ({handleRedirect}) => {
  /* ----------- state ----------- */

  const [getUser, setUser] = useState<UserInfo>();
  const [pseudalInput, setPseudalInput] = useState<string>(""); // on référence le champ du formulaire

  useEffect(() => {
    if (getUser !== undefined) LocalStorageValue();
  }, [getUser]);

  // on défini le call API à effectuer au submit. Ce call est effectué sur le pseudo rentré dans le champ formulaire
  const ApiFetchDatas = async () => {
    try {
      const apiDatas = await Axios.get(`https://api.xrlab.cepegra.be/api/appusers?filters[pseudo][$eqi]=${pseudalInput}`);
      //met un utilisateur avec un pseudonyme unique de sorte a différencier le onmount et quand l'utilisateur n'existe pas
      if (apiDatas.data.data.length === 0) setUser({ id: -1, pseudo: "" });
      else setUser({ id: apiDatas.data.data[0].id, pseudo: apiDatas.data.data[0].attributes.pseudo });
      // on crée un tableau qui comporte id et pseudo et on le stock dans user
    } catch (error) {
      console.log("api down", error);
    }
  };

  /* ---------- react ----------- */
  const HandleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();
    ApiFetchDatas(); //asynchrone
    setPseudalInput("");
  };

  //Verifie si l'utilisateur existe, s'il n'existe pas retourne un message d'erreur
  const LocalStorageValue = () => {
    //erreur -> user n'existe pas
    if (getUser !== undefined) {
      if (getUser.id === -1) {
        // Si result n'est pas égal à un, on affiche un message d'erreur qui disparait après 2s
        const msg = document.querySelector("#msgUser")!;
        msg.classList.remove("hidden");
        msg.classList.add("msg");
        setTimeout(() => {
          msg.classList.add("hidden");
          msg.classList.remove("msg");
        }, 2000);
        //l'utilisateur existe et donc on le stocke dans le localStorage
      } else {
        // si result = 1 alors on on stocke le tableau user en localStorage et on redirige sur HomeScreen
        localStorage.setItem("userInfo", JSON.stringify(getUser));
        handleRedirect()
        // window.location.href = "HomeScreen";
      }
    }
  };

  //s'execute lorsque l'input change de valeur
  const HandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    // update du contenu du pseudalInput dans le state
    setPseudalInput(ev.target.value);
  };

  /* ---------- render ---------- */
  return (
    <main className="flex flex-col justify-between h-screen">
      <button className="btn btn-block py-2 rounded-none btn-primary">
        <i className="fa-sharp fa-solid fa-download px-4"></i> Installer l'application
      </button>
      <h1 className="text-2xl font-bold text-center">MetaMorpho</h1>
      <section className="flex flex-col my-0 mx-auto w-4/5">
        <button className="btn my-4">Scanner QR Code</button> {/* non fonctionnel pour le moment*/}
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider">Se connecter</div>
        </div>
        <form className="flex flex-col" onSubmit={HandleSubmit}>
          <div className="flex">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={HandleChange} value={pseudalInput} />
            <button className="btn" role="submit">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div className="hidden" id="msgUser">
            <div>
              <i className="fa-lg fa-solid fa-triangle-exclamation"></i>
              <span>Erreur de pseudo</span>
            </div>
          </div>
        </form>
      </section>
      <footer className="flex justify-around py-6">
        <img src="./assets/img/logo_cepegra_couleur.svg" alt="Logo du Cepegra" width="50" className="w-3/12" />
      </footer>
    </main>
  );
};

export default Accueil;
