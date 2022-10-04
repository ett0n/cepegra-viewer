import { useEffect, useState } from "react";
import "aframe";
import ComposantExample from './components/ComposantExample'
import Accueil from './views/Accueil'
import HomeScreen from './views/HomeScreen'
import Credits from "./views/Credits";
import Notifications from "./views/Notifications";
import Gallery from "./views/Gallery";


function App(): JSX.Element {
  const [location, setLocation] = useState('ComposantExample');
  const pages = ['ComposantExample', 'Accueil', 'Credits', 'Notifications'];

  const menuPages = [
    {name: 'Accueil', class: 'fa-home'},
    {name: 'HomeScreen', class: 'fa-home'},
    {name: 'Notifications', class: 'fa-envelope'},
    {name: 'Gallery', class: 'fa-film'},
    {name: 'Credits', class: 'fa-laptop-code'}
  ]

  useEffect( () => {
    const path = window.location.pathname.replace('/', '')

    if (pages.includes(path)) {
      setLocation(path);
    } else {
      setLocation("404");
    }
  }, []);

  const handleMenu = () => {
    const toggleMenu = document.querySelector('.menuToggle')
    const menu = document.querySelector('.menu')
    const bgImg = document.querySelector('.background-image')
    toggleMenu.classList.toggle('fa-bars')
    toggleMenu.classList.toggle('fa-xmark')
    menu.classList.toggle('menu-close')
    menu.classList.toggle('menu-open')
    bgImg.classList.toggle('background-image-blurred')
  }

  const handleNavClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    setLocation(ev.currentTarget.getAttribute('href')!)
    const menu = document.querySelector('.menu');
    menu.classList.remove('menu-open')
    menu.classList.add('menu-close')
  }

  useEffect ( () => {
    document.title = location;
    window.history.pushState(location, 'Title', '/' + location)
  }, 
  [location]
  );


  return (
    <section>
     {/* Menu is hidden if we're on sectionmainpage:
     { location != "Accueil" && ( <ul className='menu menu-vertical lg:menu-horizontal bg-base-100 rounded-box'>
        {pages.map( (page, i) => ( <li><a href={page} className={location === page ? "active" : ""} key={i} onClick={handleNavClick}><i className="fa-solid fa-laptop-code"></i>{page}</a></li>))}
      </ul>)} 
      */}

{ location !== 'Accueil' && (
    <><nav className="py-8 px-4 absolute z-50 right-0">
    <a onClick={handleMenu}>
      <i className="fa-solid fa-bars fa-3x menuToggle text-white"></i>
      </a>
  </nav>
    <ul className='menu grid grid-cols-3 pt-32 menu-close grid-rows-5 text-white'>
      {menuPages.map( (el, i) => (
        <li>
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
    <li className="li--backToGame">
      <a className='flex-col' onClick={handleMenu}>
      <i className="fa-solid fa-reply fa-2x"></i>
      Retour au jeu
      </a>
      </li>
</ul></>)}

      {location === "Accueil" && (<Accueil />) }
      {location === "ComposantExample" && (<ComposantExample />) }  
      {location === "Credits" && (<Credits />)}   
      {location === "Notifications" && (<Notifications />)}
      {location === "Gallery" && (<Gallery />)} 
    </section>
    
  );
}

export default App;
