const items = [
  {
    id: "1",
    key: "1",
    title: "Image1",
    text: "Une super Image de Doge.",
    img: "https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg"
  },
  {
    id: "2",
    key: "2",
    title: "Image2",
    text: "Un super meme de yugioh",
    img: "https://static.tvtropes.org/pmwiki/pub/images/im_scary.jpg"
  },
  {
    id: "3",
    key: "3",
    title: "Image3",
    text: "Un autre super meme de Yugioh.",
    img: "https://i.pinimg.com/736x/9f/fb/f9/9ffbf96e22f1c6d776737c6b23c0a281--funny-comments-know-your-meme.jpg"
  },
  {
    id: "4",
    key: "4",
    title: "Image4",
    text: "Villbrequibn",
    img: "https://c.tenor.com/B8fw0mLfHKEAAAAC/vilebrequin-vilebrequin-pierre-chabrier.gif"
  }
];



let res = items.map( item => item.title );
console.log(res);

let res2 = items.filter( item => item.id === "2").map( item => item.title );
console.log(res2);

const Tester2 = () => {
    return (
      <>
        <h1>Saucisse</h1>
      </>
    )
  }
  
  export default Tester2