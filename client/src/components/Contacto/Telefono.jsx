import React from "react";

const Telefono = ({ numero }) => {
  const sabor = "fresa";
  const precio = 190;

  return (
    <a
      className="flex font-semibold"
      href={`https://wa.me/5355081161?text=${sabor} ${precio}`}
    >
      <img className="w-8 h-8" src="/images/was100.png" alt="WhatsAPP" />
      {numero}
    </a>
  );
};

export default Telefono;
