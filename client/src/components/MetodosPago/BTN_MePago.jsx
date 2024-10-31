import React from "react";

const BTN_MePago = ({ imagen, name, onclick }) => {
  return (
    <button className="" type="button" onClick={onclick}>
      <img
        className="w-20 h-12 rounded-xl hover:scale-110 transition-all duration-700 active:border-cyan-500 border-spacing-1 "
        src={`../images/${imagen}`}
        alt={name}
      />
    </button>
  );
};

export default BTN_MePago;
