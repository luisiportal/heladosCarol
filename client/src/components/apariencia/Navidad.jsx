import React, { useEffect } from 'react';

const Navidad = () => {
  useEffect(() => {
    const snowflakesContainer = document.createElement('div');
    snowflakesContainer.className = 'snowflakes-container';
    document.body.appendChild(snowflakesContainer);

    function createSnowflake() {
      const snowflake = Object.assign(document.createElement('div'), {
        className: 'snowflake',
        style: `
              left: ${Math.random() * innerWidth}px;
              top: -5px;
              opacity: ${Math.random()};
              transform: scale(${Math.random() * 1.5 + 0.5});`,
      });

      snowflakesContainer.appendChild(snowflake);

      let posY = -5;
      let speed = Math.random() * 2 + 1;
      let wobble = 0;

      function fall() {
        posY += speed;
        wobble += 0.02;
        snowflake.style.top = posY + "px";
        snowflake.style.left =
          parseFloat(snowflake.style.left) + Math.sin(wobble) * 2 + "px";

        if (posY < innerHeight) {
          requestAnimationFrame(fall);
        } else {
          snowflake.remove();
        }
      }

      fall();
    }

    let snowflakeInterval = setInterval(() => {
      if (snowflakesContainer.childElementCount < 100) {
        createSnowflake();
      }
    }, 100);

    return () => {
      clearInterval(snowflakeInterval);
      snowflakesContainer.remove();
    };
  }, []);

  return <div></div>;
};

export default Navidad;
