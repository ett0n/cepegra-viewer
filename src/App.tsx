import { useState } from "react";
import "aframe";
import ComposantExample from './components/ComposantExample'
import BackgroundChooser from "./components/BackgroundChooser";
import TestBckimg from "./components/TestBckimg";
import Test4 from "./components/Test4";
import Tester3 from "./components/Tester3";
import Tester5 from "./components/Tester5";
import Tester7 from "./components/Tester7";
import Tester8, { CarouselItem } from "./components/Tester8";


function App() {
  return (
    <main>
      
      <Tester8>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
      </Tester8>

    </main>
  );
}

export default App;
