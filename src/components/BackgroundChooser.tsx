const BackgroundChooser = () => {
    

    
    return (
      <>
        <h2>Tu serais pas un énorme FDP ?</h2>
        <button className="btn">https://codepen.io/dobladov/pen/ZOqOoa</button>

        <main>

<div id="carousel position: relative; h-100 inset-1/2 translate-y-1/2 overflow-hidden">

   <div className="hideLeft position: absolute;">
    <img src="https://i1.sndcdn.com/artworks-000165384395-rhrjdn-t500x500.jpg"/>
  </div>

  <div className="prevLeftSecond position: absolute;">
    <img src="https://i1.sndcdn.com/artworks-000185743981-tuesoj-t500x500.jpg"/>
  </div>

  <div className="prev">
    <img src="https://i1.sndcdn.com/artworks-000158708482-k160g1-t500x500.jpg"/>
  </div>

  <div className="selected">
    <img src="https://i1.sndcdn.com/artworks-000062423439-lf7ll2-t500x500.jpg"/>
  </div>

  <div className="next">
    <img src="https://i1.sndcdn.com/artworks-000028787381-1vad7y-t500x500.jpg"/>
  </div>

  <div className="nextRightSecond">
    <img src="https://i1.sndcdn.com/artworks-000108468163-dp0b6y-t500x500.jpg"/>
  </div>

  <div className="hideRight">
    <img src="https://i1.sndcdn.com/artworks-000064920701-xrez5z-t500x500.jpg"/>
  </div>

</div>

<div className="buttons">
  <button id="prev">Prev</button>
  <button id="next">Next</button>
</div>

</main>
      </>
    )
  }
  
  export default BackgroundChooser