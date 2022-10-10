// @ts-nocheck

import Sliderpersonnage from "./components/Sliderpersonnage";
import Sliderbackground from "./components/Sliderbackground";
import ArPersoOK from "./components/ArPersoOK";
import BallPit from "./components/BallPit";
import ReactDOM from 'react-dom';


import { Canvas } from '@react-three/fiber'
import { useGLTF, Box } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useHitTest } from '@react-three/xr'

import { useEffect, useState } from "react";
import "aframe";
import ComposantExample from './components/ComposantExample'
import Accueil from './views/Accueil'
import HomeScreen from './views/HomeScreen'
import Credits from "./views/Credits";
import Notifications from "./views/Notifications";
import Gallery from "./views/Gallery";

interface UserInfo {id: number; pseudo: string;}


function App(): JSX.Element {
  //state
  const userInfo= JSON.parse(localStorage.getItem('userInfo'))
  const [location, setLocation] = useState('HomeScreen');
  const pages = ['Accueil', 'HomeScreen', 'Credits', 'Notifications', 'Gallery', 'Sliderpersonnage' , 'Sliderbackground'];

  const menuPages = [
    {name: 'Accueil', class: 'fa-home'},
    {name: 'HomeScreen', class: 'fa-home'},
    {name: 'Notifications', class: 'fa-envelope'},
    {name: 'Gallery', class: 'fa-film'},
    {name: 'Credits', class: 'fa-laptop-code'},
    {name: 'Sliderpersonnage', class: 'fa-laptop-code'},
    {name: 'Sliderbackground', class: 'fa-laptop-code'}
  ]

  useEffect( () => {
    const path = window.location.pathname.replace('/', '')

    if (pages.includes(path)) {
      setLocation(path);
    } else {
      setLocation("404");
    }
  }, []);

  useEffect ( () => {
    document.title = location;
    window.history.pushState(location, 'Title', '/' + location)
  }, 
  [location]
  );

  //react

  const handleMenu = () => {
    const toggleMenu = document.querySelector('.menuToggle')
    const menu = document.querySelector('.menu')
    const bgImg = document.querySelector('.background-image')
    toggleMenu.classList.toggle('fa-bars')
    toggleMenu.classList.toggle('fa-xmark')
    menu.classList.toggle('menu-close')
    menu.classList.toggle('menu-open')
  }

  const handleNavClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    setLocation(ev.currentTarget.getAttribute('href')!)
    handleMenu();
  }

  const handleDisconnect = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    if (confirm(`Voulez-vous vraiment vous déconnecter ? Vous ne pourrez plus accéder à vos personnage sans votre mot de passe ou votre code QR`) == true ) {
      console.log("destruction localstorage")
      localStorage.removeItem('userInfo')
      window.location.href = 'Accueil'
    } else {
      alert("vous avez choisi de ne pas vous déconecter")
    }
  }

//rendu
  return (

<main>
  { JSON.parse(localStorage.getItem('userInfo')) === null || location !== 'Accueil' &&
      (<header className="h-24"><nav className="py-8 px-4 absolute z-50 right-0">
      <a onClick={handleMenu}>
        <i className="fa-solid fa-bars fa-3x menuToggle text-white"></i>
        </a>
    </nav>
      <ul className='menu grid grid-cols-3 pt-32 menu-close grid-rows-5 text-white'>
        {menuPages.map( (el, i) => (
          <li key={i} >
            <a
              href={el.name}
              key={i}
              onClick={handleNavClick}
              className='flex-col'
              >
              <i className={'fa-solid fa-2x  ' + el.class}></i>
              {el.name}</a>
          </li>
        ))}
      <li className ="li--disconnect">
        <a className="flex-col" onClick={handleDisconnect}>
        <i className="fa-solid fa-right-to-bracket fa-2x"></i>
        Déconnexion</a>
      </li>
      <li className="li--backToGame">
        <a className='flex-col' onClick={handleMenu}>
        <i className="fa-solid fa-reply fa-2x"></i>
        Retour au jeu
        </a>
        </li>
  </ul></header>)}
        {
          JSON.parse(localStorage.getItem('userInfo')) === null
            ? window.history.pushState(location, '', 'Accueil') && <Accueil />
            : window.history.pushState(location, '', location) }
        {JSON.parse(localStorage.getItem('userInfo')) === null && window.history.pushState(location, '', 'Accueil') && location === 'Accueil'}
        {location === 'Accueil' && <Accueil />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'HomeScreen' && <HomeScreen />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Credits' && <Credits />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Notifications' && <Notifications />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Gallery' && <Gallery />}
        {location === 'Sliderbackground' && <Sliderbackgroundound />}
        {location === 'Sliderpersonnage' && <Sliderpersonnage />}

        
</main>)

}

export default App;
