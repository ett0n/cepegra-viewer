import test from '../test.json'
import test2 from '../test2.json'
const TestBck = () => {
  return (
    <>
      <h2>LO£PASA</h2>
      <div className="inner">
        {
          test && test.map(back => {
            return(
              <div className="box" key={back.id}>
                <img src={back.img} />
                <br />
                {back.text}
                <div><img src={back.img[2]} /></div>
              </div>
            )
          })
        }
      </div>

      <div>
      {test2.images.map((image, i) => (
        <div className="item" key={"1"}>
          <img src={`${image.img}`} alt={image.text} key={"1"} />
        </div>
      ))}
    </div>
    </>
  )
}

export default TestBck