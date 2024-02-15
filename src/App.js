import './App.css';
import { useEffect, useState } from 'react';
import { images } from './Constants';

function App() {

  const [imagesForDisplay, setImagesForDisplay] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);

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
    console.log(displayIndex);
    console.log(imagesForDisplay);
  }

  useEffect(() => {
    // const images = ["1","2","3","4","5","6","7","8","9"];
    shuffleImages(images);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anime Characters</h1>        
        <div className="image-container">
          {[...imagesForDisplay]
            .slice(displayIndex, displayIndex + 3)
            .map((i) => {
              return <img className="image-element" key={i} src={i} alt="" />
          })}
        </div>
        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={giveNextThree}>
          {displayIndex + 3 < imagesForDisplay.length ? "Next" : "Start Over"}
        </button>
      </header>
    </div>
  );
}

export default App;
