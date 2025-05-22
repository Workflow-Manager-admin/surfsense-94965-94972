/**
 * Utility to dynamically load background images after the app has initialized
 * This helps prevent issues with relative paths in CSS
 */

/**
 * Apply oceanic background styles to the app
 * PUBLIC_INTERFACE
 */
export const applyOceanicBackgrounds = () => {
  // Set ocean pattern background
  document.body.style.backgroundImage = `linear-gradient(135deg, rgba(13, 71, 161, 0.8), rgba(1, 87, 155, 0.9))`;
  
  // Add wave patterns to all cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const waveBg = document.createElement('div');
    waveBg.style.position = 'absolute';
    waveBg.style.bottom = '0';
    waveBg.style.left = '0';
    waveBg.style.right = '0';
    waveBg.style.height = '40px';
    waveBg.style.background = `radial-gradient(ellipse at bottom, rgba(0, 229, 255, 0.2) 0%, transparent 70%)`;
    waveBg.style.opacity = '0.2';
    waveBg.style.zIndex = '-1';
    
    // Only append if the card has position relative
    const cardPosition = window.getComputedStyle(card).getPropertyValue('position');
    if (cardPosition !== 'static') {
      card.appendChild(waveBg);
    } else {
      card.style.position = 'relative';
      card.appendChild(waveBg);
    }
  });
  
  // Add subtle animated gradient to section backgrounds
  const sections = document.querySelectorAll('.glass-panel');
  sections.forEach(section => {
    section.style.backgroundImage = `linear-gradient(135deg, rgba(1, 87, 155, 0.2), rgba(0, 188, 212, 0.1))`;
  });
  
  console.log('Applied oceanic background effects');
};

/**
 * Apply a neon glow effect to specified elements
 * PUBLIC_INTERFACE
 */
export const applyNeonEffects = (selector = '.glow-text', color = 'rgba(0, 229, 255, 0.7)') => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.style.textShadow = `0 0 10px ${color}`;
  });
};
