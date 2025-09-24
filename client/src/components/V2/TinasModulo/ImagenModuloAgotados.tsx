import React from "react";

const ImagenModuloAgotados = ({
  css,
  imagen,
}: {
  imagen: string;
  css: string;
}) => {
  return (
    <img
      className={`border-4 border-neutral-200 rounded-xl w-36 h-52 object-cover ${css}`}
      src={`images/tinas/${imagen}`}
      alt=""
    />
  );
};

export default ImagenModuloAgotados;
