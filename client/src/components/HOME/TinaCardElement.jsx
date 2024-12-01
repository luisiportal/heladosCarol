import React from "react";

const TinaCardElement = ({ tina }) => {
  return (
    <div
      style={{ backgroundColor: "#" + tina.color }}
      className="flex flex-col justify-center items-center font-irish text-md text-center rounded-lg p-2 w-24 h-16 overflow-hidden relative"
    >
      <div className="">
        {" "}
        <h2 className="flex translate-y-0 move_up transition-all duration-700 p-1">
          {tina.nombre_sabor}
        </h2>{" "}
        <div className="opacity-0 absolute -top-1 left-4 translate-y-3 aparecer transition-all duration-700">
          <h2>{tina.precio_venta} USD</h2>{" "}
          <h2 className="text-xs">{tina.precio_venta_cup} CUP</h2>
        </div>
      </div>
    </div>
  );
};

export default TinaCardElement;
