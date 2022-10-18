// @ts-nocheck
/* ----------------------------------- Import ----------------------------------- */
// Import Dependancies
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber'
import { useGLTF, Box } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useHitTest } from '@react-three/xr'

// Import views
import Accueil from './views/Accueil'
import HomeScreen from './views/HomeScreen'
import Credits from "./views/Credits";
import Notifications from "./views/Notifications";
import Gallery from "./views/Gallery";
import Customizer from "./views/Customizer"

/* --------------------------------- Interacts --------------------------------- */
interface UserInfo {id: number; pseudo: string;}


/* -------------------------------- Application -------------------------------- */
function App(): JSX.Element {
  /* ----------- state ----------- */
  const userInfo= JSON.parse(localStorage.getItem('userInfo')) 
  const [location, setLocation] = useState(''); // par défaut dit que le path = HomeScreen pour bypasser l'écran de connection si on a déjà userInfo dans local storage
  const pages = ['Accueil', 'HomeScreen', 'Credits', 'Notifications', 'Gallery', 'Customizer'];

  const menuPages = [
    // on défini les liens à afficher dans le menu ainsi que la classe que leur icone utilisera
    {name: 'Accueil', class: 'fa-home'},
    {name: 'HomeScreen', class: 'fa-home'},
    {name: 'Notifications', class: 'fa-envelope'},
    {name: 'Gallery', class: 'fa-film'},
    {name: 'Credits', class: 'fa-laptop-code'},
    {name: 'Customizer', class: 'fa-wand-magic-sparkles'}
  ]

  useEffect( () => {
    // on stock le path dans une const. Si path est inclu dans les pages qui sont listées en haut du state, alors on change la location, sinon on renvoie 404
    const path = window.location.pathname.replace('/', '')
    if (pages.includes(path)) {
      setLocation(path);
    } else {
      setLocation("404");
    }
  }, []);

  useEffect ( () => {
    // on change le titre de la page et l'url quand location change
    document.title = location;
    window.history.pushState(location, 'Title', '/' + location)
  }, 
  [location]
  );

  /* ----------- react ----------- */
  const handleMenu = () => {
    // quand on click sur le burger (toggleMenu), on toggle l'apparence barre menu / croix ainsi que la visibilité des éléments du menu 
    const toggleMenu = document.querySelector('.menuToggle')
    const menu = document.querySelector('.menu')
    toggleMenu.classList.toggle('fa-bars')
    toggleMenu.classList.toggle('fa-xmark')
    menu.classList.toggle('menu-close')
    menu.classList.toggle('menu-open')
  }

  const handleNavClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    //quand on clique sur un élément du menu, on prend le href du lien cliqué et on le pousse dans location, puis on appelle handle menu (pour refermer le menu)
    setLocation(ev.currentTarget.getAttribute('href')!)
    handleMenu();
  }

  const handleDisconnect = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    // quand l'user clique pour se déconnecter, on lui demande de confirmer son choix. Si confirmation -> on détruit le local storage et redirige sur l'accueil
    if (confirm(`Voulez-vous vraiment vous déconnecter ? Vous ne pourrez plus accéder à vos personnage sans votre mot de passe ou votre code QR`) == true ) {
      localStorage.removeItem('userInfo')
      window.location.href = 'Accueil'
    } else {
      alert("vous avez choisi de ne pas vous déconecter")
    }
  }

  const handleRedirect = () => {
    setLocation('HomeScreen')
  }

/* ----------- rendu ----------- */
  return (<>
  { (JSON.parse(localStorage.getItem('userInfo')) !== null || location !== 'Accueil') &&
  // si userInfo n'est pas dans le localStorage ou si la location est différente de Accueil, alors on affiche le menu. Attention l'effet de blur du menu est appliqué dans le css sur le fond d'écran par défaut, il faut le rendre dynamique
      (<header className="h-24">
        <nav className="py-8 px-4 absolute z-50 right-0">
          <a onClick={handleMenu}>
            <i className="fa-solid fa-bars fa-3x menuToggle text-white"></i>
          </a>
        </nav>
        <ul className='menu grid grid-cols-3 pt-32 menu-close grid-rows-5 text-white'>
          {menuPages.map( (el, i) => (
            //on boucle menuPage pour afficher un li > a pour chaque élément
            <li key={i} >
              <a
                href={el.name}
                key={i}
                onClick={handleNavClick}
                className='flex-col'
                >
                  <i className={'fa-solid fa-2x  ' + el.class}></i>
                  {el.name}
                </a>
              </li>
           ))}
           {/* On ajoute manuellement les liens de déconnexion et fermeture du menu  */}
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
          </ul>
        </header>)}
        { // si  le localStorage ne contient pas user Info, alors on affiche Accueil et on set la location sur accueil
          JSON.parse(localStorage.getItem('userInfo')) === null
            ? window.history.pushState(location, '', 'Accueil') && <Accueil handleRedirect={handleRedirect}/>
            : window.history.pushState(location, '', 'HomeScreen') }
        {/* // je ne sais plus pourquoi j'avais ça, j'ai l'impression que ça fait double emploi avec l'instruction précédente mais je suis plus certain donc je garde en comm
         {JSON.parse(localStorage.getItem('userInfo')) === null && window.history.pushState(location, '', 'Accueil') && location === 'Accueil'} */}
        { // permet d'afficher l'écran de connexion quand on le clique depuis le menu. Utile tant qu'on développe, on peut le retirer par après 
          location === 'Accueil' && <Accueil handleRedirect={handleRedirect} />} 
          {/* Si il y a bien un élément userInfo dans le localStorage, alors on permet l'accès aux routes ci-dessous */}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'HomeScreen' && <HomeScreen />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Credits' && <Credits />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Notifications' && <Notifications />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Gallery' && <Gallery />}
        {JSON.parse(localStorage.getItem('userInfo')) !== null && location === 'Customizer' && <Customizer />} 
</>)
}
export default App;