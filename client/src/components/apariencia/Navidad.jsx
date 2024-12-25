import React from "react";

const Navidad = () => {
  function createSnowflake() {
    const snowflake = Object.assign(document.createElement("div"), {
      className: "snowflake",
      style: `
            left: ${Math.random() * innerWidth}px;
            top: -5px;
            opacity: ${Math.random()};
            transform: scale(${Math.random() * 1.5 + 0.5});`,
    });

    document.body.appendChild(snowflake);

    let posY = -5;
    let speed = Math.random() * 2 + 1;
    let wobble = 0;

    function fall() {
      posY += speed;
      wobble += 0.02;
      snowflake.style.top = posY + "px";
      snowflake.style.left =
        parseFloat(snowflake.style.left) + Math.sin(wobble) * 2 + "px";

      posY < innerHeight ? requestAnimationFrame(fall) : snowflake.remove();
    }

    fall();
  }

  function generateSnow() {
    setInterval(createSnowflake, 100);
  }



  return <div>
    {  generateSnow()}
  </div>;
};

export default Navidad;
