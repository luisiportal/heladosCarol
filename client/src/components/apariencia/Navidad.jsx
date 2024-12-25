import React, { useEffect } from 'react';

const Navidad = () => {
  useEffect(() => {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'snowflakes-container';
    document.body.appendChild(snowflakesContainer);

    const createSnowflake = () => {
      const snowflake = Object.assign(document.createElement('div'), {
        className: 'snowflake',
        style: `
          left: ${Math.random() * innerWidth}px;
          top: -5px;
          opacity: ${Math.random() * 0.5 + 0.5}; 
          transform: scale(${Math.random() * 0.75 + 0.25});`,
      });

      snowflakesContainer.appendChild(snowflake);

      let posY = -5;
      const speed = Math.random() * 2 + 1;
      let wobble = Math.random() * 1000; // Start with a random wobble

      const fall = () => {
        posY += speed;
        wobble += 0.01;
        snowflake.style.top = posY + 'px';
        snowflake.style.left = parseFloat(snowflake.style.left) + Math.sin(wobble) * 2 + 'px';

        if (posY < innerHeight) {
          requestAnimationFrame(fall);
        } else {
          snowflake.remove();
        }
      };

      requestAnimationFrame(fall);
    };

    let snowflakeCount = 0;
    const maxSnowflakes = 50;
    const snowflakeInterval = setInterval(() => {
      if (snowflakeCount < maxSnowflakes) {
        createSnowflake();
        snowflakeCount++;
      }
    }, 200);

    return () => {
      clearInterval(snowflakeInterval);
      snowflakesContainer.remove();
    };
  }, []);

  return null;
};

export default Navidad;
