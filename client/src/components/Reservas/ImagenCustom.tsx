import React from "react";

const ImagenCustom = ({ imagen }: { imagen: string }) => {
  return (
    <img
      className="w-20 rounded-xl border-neutral-300 border-2 "
      src={`/images/reservaCustom/${imagen}`}
      alt="Reservas"
    />
  );
};

export default ImagenCustom;
