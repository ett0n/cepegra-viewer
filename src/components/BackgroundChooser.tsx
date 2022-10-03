import test from '../test.json'

const BackgroundChooser = () => {
  return (
    var albums = [
      {
        title: "City & Architecture",
        description: "Beautiful free photos of cities and architecture found at www.unsplash.com.",
        images: ["https://unsplash.com/photos/hyxka6To3I8/download?force=true", "https://unsplash.com/photos/v4ZsX4tNpM0/download?force=true", "https://unsplash.com/photos/CCD1y0qb8hQ/download?force=true", "https://unsplash.com/photos/HhmCIJTLuGY/download?force=true", "https://unsplash.com/photos/29VFqg1pyK8/download?force=true", "https://unsplash.com/photos/ALBc326eGas/download?force=true", "https://unsplash.com/photos/QoEHqszeva8/download?force=true", "https://unsplash.com/photos/mG5jTwsXcEI/download?force=true", "https://unsplash.com/photos/_QoAuZGAoPY/download?force=true"]
      },
      {
        title: "Food Theme",
        description: "Nice free photos of food for your inspiration found at www.unsplash.com.",
        images: ["https://unsplash.com/photos/GTMGG-xvxdU/download?force=true", "https://unsplash.com/photos/JoGHIF4O9UM/download?force=true", "https://unsplash.com/photos/wMzx2nBdeng/download?force=true", "https://unsplash.com/photos/nkHBFwVBzkg/download?force=true", "https://unsplash.com/photos/W6sqUYlJRiw/download?force=true", "https://unsplash.com/photos/M01DfkOqz7I/download?force=true", "https://unsplash.com/photos/b9xUX3HR5nQ/download?force=true", "https://unsplash.com/photos/Zsot3R_L4i4/download?force=true"]
      },
      {
        title: "People & Portraits",
        description: "Free portraits and photos of people. Source: www.unsplash.com.",
        images: ["https://unsplash.com/photos/vBetZA2-bJg/download?force=true", "https://unsplash.com/photos/LN8KyzS3OJ8/download?force=true", "https://unsplash.com/photos/rxPqkK0hp3c/download?force=true", "https://unsplash.com/photos/AHBvAIVqk64/download?force=true", "https://unsplash.com/photos/4uojMEdcwI8/download?force=true"]
      },
    ]
    
    class AlbumsList extends React.Component {
      
      constructor(props) {
        super(props);
        this.state = {
          albums
        }
      }
     
      render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                  {
                    this.state.albums.map((album, albumindex) => {
                      return (
                        <div className="albumSpace"key={albumindex}>
                          <div className="container album fill">
                              <div className="header row">
                                <h2>{album.title}</h2>
                                <h6><i>{album.images.length} files</i></h6>
                                <h5>{album.description}</h5>
                             </div>
                          </div>
                          <ImageRow albums={this.state.albums} albumkey={albumindex} />
                        </div>
                      )
                    })
                  }
              </div>
            </div>
          </div>
        )
      }
    };
    
    class ImageRow extends React.Component {
      
      constructor(props) {
        super(props);
        this.state = {
          start: 0,
          finish: 3,
          fadedleft: true,
          fadedright: false
        }
      }
      
      leftClick() {
        let start = this.state.start;
        let finish = this.state.finish;
        if (start > 0) {
          this.setState({
            start: start - 3,
            finish: finish - 3,
            fadedright: false
          });
        } else {
          this.setState({
            fadedleft: true
          });
        }
      }
      
      rightClick(length) {
        let start = this.state.start;
        let finish = this.state.finish;
        if (finish < length) {
          this.setState({
            start: start + 3,
            finish: finish + 3,
            fadedleft: false
          });
        } else {
          this.setState({
            fadedright: true
          });
        }
      }
    
      render() {
        const {start, finish, fadedleft, fadedright} = this.state
        const left = fadedleft ? "arrow-left faded-left" : "arrow-left";
        const right = fadedright ? "arrow-right faded-right" : "arrow-right";
        var length = this.props.albums[this.props.albumkey].images.length;    // the number of images in each album
        return (
          <div className="slideshow row">
            <div className={left} onClick={this.leftClick.bind(this)}></div>
            <div className="imageRow">
              {
                this.props.albums[this.props.albumkey].images.slice(start, finish).map((i, imgindex) => {
                  return (
                    <div key={imgindex}>
                      <img className="image" src={i} alt='album img' />
                    </div>
                  )
                })
              }
           </div>
           <div className={right} onClick={this.rightClick.bind(this, length)}></div>
         </div>
        )
      }
    }
    
    ReactDOM.render(
      <AlbumsList />,
      document.getElementById('root')
    );
  )
}

export default BackgroundChooser