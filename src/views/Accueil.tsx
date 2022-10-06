// @ts-nocheck
import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Form from '../components/Form'
import type Appusers from '../types/Appusers'

// interface UserInfo {id: number; pseudo: string;}

const Accueil: React.FC<props> = () => {

  /* ----------- state ----------- */
  const [user, setUser] = useState<{id: number; pseudo: string;}[]>()
  const [pseudalInput, setPseudalInput] = useState<string>('')
  const [data, setData] = useState<User>()

  const getDatas = async () => {
    const apiDatas = await Axios.get('http://xrlab.cepegra.be:1337/api/appusers?populate=*')
    const coucou = apiDatas.data.data.map( u  => {return {id: u.id, pseudo : u.attributes.pseudo}})
    console.log(coucou)
    setUser(coucou)
    setData(apiDatas.data.data)
  }
  useEffect( () => {
    getDatas()
  }, [])



  /* ---------- react ----------- */
  const connect = (ev: React.FormEvent) => {
    ev.preventDefault()
    const temp = user.filter( el => el.pseudo === pseudalInput)
    console.log(temp[0].id)
    if (temp[0].pseudo === pseudalInput) { 
      sessionStorage.setItem('userInfo', JSON.stringify(temp))
      window.location = 'HomeScreen' 
    } else {
      const msg = document.querySelector('#msgUser')
      msg.classList.remove('hidden')
      msg.classList.add('msg')
      setTimeout( () => {
        msg.classList.add('hidden')
        msg.classList.remove('msg')
      }, 2000)
    }
    setPseudalInput('')
  }

  const handleClick = () => {
    console.log('handleClick')
  }

  const handleChange = (ev: any) => {
    setPseudalInput(ev.target.value)
  }


  /* ---------- render ---------- */
    return (
    <section className="flex flex-col justify-between h-screen">
      <button className="btn btn-block py-2 rounded-none btn-primary"><i className="fa-sharp fa-solid fa-download px-4"></i> Installer l'application</button>
      <h1 className="text-2xl font-bold text-center">je suis un logoooo lol</h1>
    <section className="flex flex-col my-0 mx-auto w-4/5">
      <button className="btn my-4">Scanner QR Code</button>
      

<div className="flex flex-col w-full border-opacity-50">
  <div className="divider">Se connecter</div>
</div>
      <Form handleClick={handleClick} />
      <form className="flex flex-col" onSubmit={connect}>
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
    </section>
  )
}

export default Accueil