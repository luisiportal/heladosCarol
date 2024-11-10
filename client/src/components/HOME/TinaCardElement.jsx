import React from "react";

const TinaCardElement = ({ tina }) => {
  return (
    <div style={{ backgroundColor: "#" + tina.color }} className="flex justify-center items-center font-irish text-md text-center rounded-lg p-2 w-24 h-16">{tina.nombre_sabor}</div>
  );
};

export default TinaCardElement;
