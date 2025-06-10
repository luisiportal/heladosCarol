import React from "react";

const ItemStadistica = ({
  nombre,
  valor,
  color1 = "bg-fresa",
  color2 = "bg-fuchsia-200",
}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-2 p-5">
      <div
        className={` ${color2} rounded-full w-14 h-14 flex justify-center items-center text-white`}
      >
        <h2
          className={`${color1} rounded-full p-2 w-8 h-8 flex justify-center items-center font-semibold`}
        >
          {valor}
        </h2>
      </div>
      <h2 className="font-semibold text-sm mt-2">{nombre}</h2>
    </div>
  );
};

export default ItemStadistica;
