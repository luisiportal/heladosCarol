import React from "react";

const TinaCardElement = ({ tina }) => {
  return (
    <div style={{ backgroundColor: "#" + tina.color }} className="font-irish text-center rounded-lg p-2 w-24">{tina.nombre_sabor}</div>
  );
};

export default TinaCardElement;
