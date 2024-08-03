import React from "react";

const Btn_Huellas = ({ text, type, disabled, onclick, disbledText }) => {
  return (
    <>
      <button
        type={type}
        onClick={onclick}
        disabled={disabled}
        className=" bg-heladosCarol_color text-2md text-black font-bold block p-2 rounded-md"
      >
        {disabled ? `${disbledText}` : `${text}`}
      </button>
    </>
  );
};

export default Btn_Huellas;
