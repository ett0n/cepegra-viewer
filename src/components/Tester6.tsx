import test from '../test.json'
const Tester6 = () => {
    return (
      <>
      <img src={test[0].img}></img>
              {test.map( (el, i) => (
<div>
    <img src={el.img[0]}/>
</div>
      ))}
      </>
    )
  }
  
  export default Tester6