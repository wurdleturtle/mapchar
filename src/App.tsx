import { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import { locsx, locsy } from './locs';

function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(4);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (key >= '1' && key <= '5') {
      const index = parseInt(key) - 1;
      setIsMoving(true);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (isMoving) {
      setTimeout(() => setIsMoving(false), 5000);
    }
  }, [isMoving]);

  return (
    <>
      <div>
        <Map />
        <img
          src="https://images.wurdle.eu/wurdleturtle.png"
          className={`char ${isMoving ? 'moving' : ''}`}
          style={{
            top: `${locsy[currentIndex]}vw`,
            left: `${locsx[currentIndex]}vw`,
            position: 'absolute',
          }}
        />
      </div>
      <h1>New Landia Map</h1>
      <p>
        Key: <br />
        1 = New Landia <br />
        2 = Orcus' Cave <br />
        3 = River of Wetness <br />
        4 = Marsh of Mushiness <br />
        5 = Mountain of Steepness <br />
      </p>
    </>
  );
}

export default App;
