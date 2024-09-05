import React, { useState } from "react";

const Modal = ({ errorColor, mensaje, imagen }) => {
  
  
  document.body.style.overflow = "hidden";
  return (
    <div
      className={`${
        errorColor ? "bg-red-500" : "bg-green-500"
      } py-4 rounded px-2 text-white font-semibold transition-all z-0`}
    >
      <h2>{mensaje}</h2>
      {imagen && (
        <img
          className="object-cover object-center shadow-xl border-slate-50 border-spacing-2 rounded-md"
          src={`${imagen}`}
          alt={mensaje}
        />
      )}
    </div>
  );
};

export default Modal;
