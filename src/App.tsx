import { useState } from "react";
import "aframe";
import ComposantExample from './components/ComposantExample'
import BackgroundChooser from "./components/BackgroundChooser";

function App() {
  return (
    <main>
      <h1>Coucou</h1>
  
      <BackgroundChooser></BackgroundChooser>
    </main>
  );
}

export default App;
