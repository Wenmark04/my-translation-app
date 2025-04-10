import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [englishWord, setEnglishWord] = useState('');
  const [tagalogTranslation, setTagalogTranslation] = useState('');
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  // Translation dictionary
  const translations = {
    hello: 'kamusta',
    world: 'mundo',
    example: 'halimbawa',
    good: 'mabuti',
    morning: 'umaga',
    evening: 'gabi',
    thank: 'salamat',
    you: 'ikaw',
    please: 'pakiusap',
    sorry: 'pasensya',
    yes: 'oo',
    no: 'hindi',
    food: 'pagkain',
    water: 'tubig',
    friend: 'kaibigan',
    titi: 'burat'
  };

  // Array of placeholder image URLs (replace with your own)
  const images = [
    'https://via.placeholder.com/80x40/ff0000/ffffff?text=DVD',
    'https://via.placeholder.com/80x40/00ff00/ffffff?text=DVD',
    'https://via.placeholder.com/80x40/0000ff/ffffff?text=DVD',
    'https://via.placeholder.com/80x40/ffff00/ffffff?text=DVD',
    'https://via.placeholder.com/80x40/ff00ff/ffffff?text=DVD'
  ];

  const translateWord = () => {
    const translation = translations[englishWord.toLowerCase()];
    setTagalogTranslation(translation || 'Translation not found');
  };

  useEffect(() => {
    const animateLogoMovement = () => {
      if (!containerRef.current || !logoRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      let { x, y } = position;
      let { x: dx, y: dy } = velocity;
      let imageChanged = false;

      // Check for collision with right or left edge
      if (x + logoRect.width > containerRect.width || x < 0) {
        dx = -dx;
        imageChanged = true;
      }

      // Check for collision with bottom or top edge
      if (y + logoRect.height > containerRect.height || y < 0) {
        dy = -dy;
        imageChanged = true;
      }

      // Change image if collision happened
      if (imageChanged) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }

      // Update position and velocity
      setPosition({ x: x + dx, y: y + dy });
      setVelocity({ x: dx, y: dy });
    };

    const intervalId = setInterval(animateLogoMovement, 30);
    return () => clearInterval(intervalId);
  }, [position, velocity, images.length]);

  return (
    <div className="container" ref={containerRef}>
      {/* DVD Logo */}
      <div 
        ref={logoRef}
        className="dvd-logo"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}
      >
 <img 
  src="/tabios.png" 
  alt="Tabios" 
  width="500" 
  height="500" 
/>


      </div>
      
      {/* Translator Content */}
      <div className="translator-content">
        <div className="translator-card">
          <h1 className="title">English to Tagalog Translator</h1>
          
          <div className="input-group">
            <label className="input-label">English Word:</label>
            <input 
              type="text" 
              value={englishWord} 
              onChange={(e) => setEnglishWord(e.target.value)}
              className="text-input"
            />
          </div>
          
          <button 
            onClick={translateWord}
            className="translate-button"
          >
            Translate
          </button>
          
          {tagalogTranslation && (
            <div className="translation-result">
              <h2 className="result-title">Tagalog Translation:</h2>
              <p className="result-text">{tagalogTranslation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;