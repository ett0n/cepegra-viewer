// @ts-nocheck
/* ----------------------------------- Import ----------------------------------- */
import Axios from 'axios'
import React, { useState, useEffect } from 'react'

/* --------------------------------- Interfaces --------------------------------- */
interface UserInfo {id: number; pseudo: string; attributes: {pseudo: string};}

/* ------------------------------------ App ------------------------------------ */
const Accueil: React.FC = () => {

  /* ----------- state ----------- */
  const [user, setUser] = useState<{id: number; pseudo: string;}[]>()
  const [pseudalInput, setPseudalInput] = useState<string>('') // on référence le champ du formulaire
  const [data, setData] = useState<UserInfo>()

  // on défini le call API à effectuer au submit. Ce call est effectué sur le pseudo rentré dans le champ formulaire
  const getDatas = async () => {
    const apiDatas =  await Axios.get(`http://xrlab.cepegra.be:1337/api/appusers?filters[pseudo][$eqi]=${pseudalInput}`)
    setData(apiDatas)
    // on crée un tableau qui comporte id et pseudo et on le stock dans user
    const tempUser = apiDatas.data.data.map( (u:UserInfo) => { return {id: u.id, pseudo: u.attributes.pseudo}})
    setUser(tempUser)
  }



  /* ---------- react ----------- */
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    getDatas()
    const result = data.data.meta.pagination.total // on stock le total de user correspondant au call
    if(result !== 1) {
      // Si result n'est pas égal à un, on affiche un message d'erreur qui disparait après 2s
      const msg = document.querySelector('#msgUser')
      msg.classList.remove('hidden')
      msg.classList.add('msg')
      setTimeout( () => {
        msg.classList.add('hidden')
        msg.classList.remove('msg')
      }, 2000)
    } else if (result === 1){
      // si result = 1 alors on on stocke le tableau user en localStorage et on redirige sur HomeScreen
      localStorage.setItem('userInfo', JSON.stringify(user)) 
      window.location.href = 'HomeScreen' 
    }
    setPseudalInput('')
  }

  const handleChange = (ev: any) => {
    // update du contenu du pseudalInput dans le state
    setPseudalInput(ev.target.value)
  }


  /* ---------- render ---------- */
    return (
    <main className="flex flex-col justify-between h-screen">
      <button className="btn btn-block py-2 rounded-none btn-primary"><i className="fa-sharp fa-solid fa-download px-4"></i> Installer l'application</button>
      <h1 className="text-2xl font-bold text-center">je suis un logoooo lol</h1>
      <section className="flex flex-col my-0 mx-auto w-4/5">
        <button className="btn my-4">Scanner QR Code</button> {/* non fonctionnel pour le moment*/}
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider">Se connecter</div>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleChange} value={pseudalInput} />
            <button className="btn" role="submit" >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div className='hidden' id="msgUser"><div><i className="fa-lg fa-solid fa-triangle-exclamation"></i><span>Erreur de pseudo</span></div></div>
        </form>
      </section>
      <footer className="flex justify-around py-6">
        <img src="./assets/logo-cepegra.png" alt="Logo du Cepegra" width="50" className="w-3/12"/>
        <img src="./assets/logo-forem.png" alt="Logo du Forem" className="w-3/12"/>
      </footer>
    </main>
  )
}

export default Accueil