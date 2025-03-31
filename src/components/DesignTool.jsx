import { useState, useEffect } from 'react';
import './DesignTool.css';

// Curated list of Google Fonts pairs
const FONT_PAIRS = [
  {
    main: 'Playfair Display',
    sub: 'Source Sans Pro',
  },
  {
    main: 'Montserrat',
    sub: 'Open Sans',
  },
  {
    main: 'Roboto Slab',
    sub: 'Roboto',
  },
  {
    main: 'Lora',
    sub: 'Poppins',
  },
];

// Function to generate random colors
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DesignTool = () => {
  const [colors, setColors] = useState({
    primary: '#000000',
    secondary: '#ffffff',
  });
  const [fonts, setFonts] = useState(FONT_PAIRS[0]);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fonts.main.replace(' ', '+')}:wght@400;700&family=${fonts.sub.replace(' ', '+')}:wght@400;600&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [fonts]);

  const regenerate = () => {
    setColors({
      primary: generateRandomColor(),
      secondary: generateRandomColor(),
    });
    setFonts(FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)]);
  };

  return (
    <div className="design-tool">
      <h1>Design Tool</h1>
      
      <div className="color-palette">
        <h2>Color Palette</h2>
        <div className="color-swatches">
          <div className="color-swatch">
            <div 
              className="color-preview" 
              style={{ backgroundColor: colors.primary }}
            />
            <span className="color-code">{colors.primary}</span>
          </div>
          <div className="color-swatch">
            <div 
              className="color-preview" 
              style={{ backgroundColor: colors.secondary }}
            />
            <span className="color-code">{colors.secondary}</span>
          </div>
        </div>
      </div>

      <div className="typography">
        <h2>Typography</h2>
        <div className="font-pair">
          <div className="font-info">
            <h3>Main Font: {fonts.main}</h3>
            <h4 style={{ fontFamily: fonts.main, color: '#000000' }}>
              The quick brown fox jumps over the lazy dog
            </h4>
          </div>
          <div className="font-info">
            <h3>Sub Font: {fonts.sub}</h3>
            <p style={{ fontFamily: fonts.sub, color: '#000000' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <button onClick={regenerate} className="regenerate-btn">
        Regenerate Design
      </button>
    </div>
