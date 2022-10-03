import test from '../test.json'
import test2 from '../test2.json'
const TestBck = () => {
  return (
    <>
      <h2>LO£PASA</h2>
      {test && test.filter((back) => back.id === "2").map((back) => back.img )}
      <img src={test.filter((back) => back.id === "2").map((back) => back.img )[0]}/>
      <div className="inner">
        {
          test && test.map(back => {
            return(
              <div className="box" key={back.id}>
                <img src={back.img} />
                <br />
                {back.text}
                <div><img src={back.img} /></div>
              </div>
            )
          })
        }
      </div>

      <div>
      {test2.images.map((image, i) => (
        <div className="item" key={i}>
          <img src={`${image.img}`} alt={image.text} key={i} />
        </div>
      ))}
    </div>
    </>
  )
}

export default TestBck