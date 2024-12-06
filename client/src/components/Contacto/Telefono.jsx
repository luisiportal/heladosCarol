import React from "react";

const Telefono = ({ numero }) => {
  const sabor = "fresa";
  const precio = 190;

  return (
    <a
      className="flex font-semibold"
      target="_blank"
      href={`https://wa.me/${numero}`}
    >
      <img className="w-8 h-8" src="/images/was100.png" alt="WhatsAPP" />
      {numero}
    </a>
  );
};

export default Telefono;
