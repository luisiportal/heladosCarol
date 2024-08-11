import React from "react";
import MostrarErrorMessage from "../../../ValidacionForm/MostrarErrorMessage";

const InputEntrega = ({type,name,placeholder,handlechange,value,errors}) => {
  return (
    <>
      <input
        className="rounded-xl w-full bg-neutral-200 placeholder:text-slate-800 font-semibold p-2 mb-4"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handlechange}
        value={value}
      />
      <MostrarErrorMessage campo={name} errors={errors} />
    </>
  );
};

export default InputEntrega;
