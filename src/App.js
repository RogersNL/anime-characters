import './App.css';
import { useEffect, useState } from 'react';
import { images } from './Constants';

function App() {

  const [imagesForDisplay, setImagesForDisplay] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const shuffleImages = (imageArray) => {
    let currentIndex = imageArray.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [imageArray[currentIndex], imageArray[randomIndex]] = [
        imageArray[randomIndex], imageArray[currentIndex]];
    }

    setImagesForDisplay(imageArray);
  }

  const giveNextThree = () => {
    if(displayIndex + 3 < imagesForDisplay.length) {
      setDisplayIndex(displayIndex + 3) 
    } else {
      setDisplayIndex(0); 
      shuffleImages(images); 
    }  
  }

  useEffect(() => {
    shuffleImages(images);
  }, []);

  const openModal = (imgIndex) => {
    setModalIndex(imgIndex);
    setShowModal(true);
  }

  const ModalComponent = (props) => {
    return (
      <>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <img className="image-element modal-image" key={props.imgIndex} src={[...images][props.imgIndex]} alt="" referrerPolicy={[...images][props.imgIndex].includes("static.wikia") ? "no-referrer" : "strict-origin-when-cross-origin"} />
          </div>
        </div>
      </>
    )
  }

  const ShuffleComponent = () => {
    return (
      <>
        <div className="image-container">
          {[...imagesForDisplay]
            .slice(displayIndex, displayIndex + 3)
            .map((i) => {
              return <img className="image-element" key={i} src={i} alt="" referrerPolicy={i.includes("static.wikia") ? "no-referrer" : "strict-origin-when-cross-origin"} />
            })}
        </div>
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={giveNextThree}>
          {displayIndex + 3 < imagesForDisplay.length ? "Next" : "Start Over"}
        </button>
      </>
    )
  }

  const ShowAllComponent = () => {
    return (
      <>
        <div className="all-images-container">
          {[...images]
            .map((i, index) => {
              return (
                <>
                  <div key={index} className="image-wrapper" onClick={() => openModal(index)}> 
                    <img className="image-element" src={i} alt="Failed to load img..." referrerPolicy={i.includes("static.wikia") ? "no-referrer" : "strict-origin-when-cross-origin"} />
                    <h2>{index + 1}</h2>
                  </div>
                </>
              )
            })}
        </div>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span>
            Anime Characters
          </span>
          <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={() => setShowAll(!showAll)}>{showAll ? "Go Back" : "Show All"}</button>
        </h1>
        {showAll && <ShowAllComponent/>} 
        {!showAll && <ShuffleComponent/>}
      </header>
      {showModal && <ModalComponent imgIndex={modalIndex} />}
    </div>
  );
}

export default App;
