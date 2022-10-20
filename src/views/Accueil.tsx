// @ts-nocheck il n'y a qu'une erreur TS en ligne 96 mais c'est sur un code que j'ai repiqué à Lucie et qui n'a pas cette erreur, je sais pas pourquoi
/* ----------------------------------- Import ----------------------------------- */
import Axios from "axios";
import React, { useState, useEffect } from "react";
import QrReader from "../components/QrReader"

/* --------------------------------- Interfaces --------------------------------- */
interface UserInfo {
  id: number;
  pseudo: string;
}

/* ------------------------------------ App ------------------------------------ */
const Accueil = ({handleRedirect}) => {
  /* ----------- state ----------- */

  const [getUser, setUser] = useState<UserInfo>();
  const [pseudalInput, setPseudalInput] = useState<string>(""); 
  const [getShowQR, setShowQR] = useState(false)
  const [getQrResult, setQrResult] = useState<string>("");

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
      }
    }
  };

  //s'execute lorsque l'input change de valeur
  const HandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    // update du contenu du pseudalInput dans le state
    setPseudalInput(ev.target.value);
  };

  // Code pour appeler afficher/masquer le composant de scan du QR
  const HandleQR = () => {
    setShowQR(!getShowQR)
    // fix temproraire pour forcer la mise en localSotrage de User1 et pouvoir simuler le scan de QR
    localStorage.setItem("userInfo", JSON.stringify({"id":1,"pseudo":"User1"}))
    setTimeout(() => {
      handleRedirect()
    }, 5000)
  }
  
  /* ---------- render ---------- */
  return (
      <main>
      <button className="btn btn-block py-2 rounded-none btn-primary install">
        <i className="fa-sharp fa-solid fa-download px-4"></i> Installer l'application
      </button>
      <h1 className="text-2xl font-bold text-center">MetaMorpho</h1>
      <section className="flex flex-col my-0 mx-auto w-4/5">
        <button className="btn my-4" onClick={HandleQR}>Scanner QR Code</button>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider">Se connecter</div>
        </div>
        {getShowQR && <QrReader setQrResult={setQrResult} />}
        { !getShowQR &&  <form className="flex flex-col" onSubmit={HandleSubmit}>
         
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
        </form>}
      </section>
      <footer className="flex justify-around py-6">
        <img src="./assets/img/logo_cepegra_couleur.svg" alt="Logo du Cepegra" width="50" className="w-3/12" />
      </footer>
    </main>
  );
};

export default Accueil;
