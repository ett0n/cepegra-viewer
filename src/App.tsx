import { useEffect, useState } from "react";
import "aframe";
import ComposantExample from './components/ComposantExample'
import Accueil from './components/Accueil'


function App(): JSX.Element {
  const [location, setLocation] = useState('ComposantExample');
  const pages = ['ComposantExample', 'Accueil'];

  useEffect( () => {
    const path = window.location.pathname.replace('/', '')

    if (pages.includes(path)) {
      setLocation(path);
    } else {
      setLocation("404");
    }
  }, []);
  const handleNavClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    setLocation(ev.currentTarget.getAttribute('href')!);
    // console.log(ev.currentTarget.getAttribute('href'))
  }

  useEffect ( () => {
    document.title = location;
    window.history.pushState(location, 'Title', '/' + location)
  }, 
  [location]
  );


  return (
    <main>
      <nav>
        {pages.map( (page, i) => ( <a href={page} className={location === page ? "active" : ""} key={i} onClick={handleNavClick}>{page}</a>))}
      </nav>
      {location === "Accueil" && (<Accueil />) }
      {location === "ComposantExample" && (<ComposantExample />) }      
      <ComposantExample />
    </main>
    
  );
}

export default App;
