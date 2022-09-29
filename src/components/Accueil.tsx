const Accueil = () => {
  return (
    <section className="flex flex-col justify-between h-screen">
      <button className="btn btn-block py-2 rounded-none btn-primary"><i className="fa-sharp fa-solid fa-download px-4"></i> Installer l'application</button>
      <h1>je suis un logoooo</h1>
    <section className="flex flex-col my-0 mx-auto w-4/5">
      <button className="btn my-4">Scanner QR</button>
      <button className="btn my-4">Se connecter</button>
    </section>
    <footer className="flex justify-around py-6">
      <img src="./assets/logo-cepegra.png" alt="Logo du Cepegra" width="50" height="25" className="w-3/12"/>
      <img src="./assets/logo-forem.png" alt="Logo du Forem" height="25" className="w-3/12"/>
    </footer>
    </section>
  )
}

export default Accueil