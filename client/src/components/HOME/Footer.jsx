import React from "react";
import LogoHeladosCarol from "../Utilidades/LogoHeladosCarol";

const Footer = () => {
  return (
    <div className=" bg-fresa flex flex-col justify-center items-center p-10 my-5 rounded-lg gap-2 ">
      <LogoHeladosCarol />
      <div className=" flex justify-center text-md text-slate-100 flex-col">
        <a href="mailto:heladoscarol@gmail.com">heladoscarol@gmail.com</a>
        <h2>Holguín, Cuba</h2>
      </div>
    </div>
  );
};

export default Footer;
