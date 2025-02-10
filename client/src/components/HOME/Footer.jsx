import React from "react";
import LogoHeladosCarol from "../Utilidades/LogoHeladosCarol";
import Social from "../Social/Social";

const Footer = () => {
  return (
    <div className=" bg-fresa flex flex-col justify-center items-center p-10 my-5 rounded-lg gap-2 mb-11">
      <LogoHeladosCarol />
      <div className=" flex justify-center text-md text-slate-100 flex-col">
        <a href="mailto:heladoscarol@gmail.com">heladoscarol@gmail.com</a>
        <h2>+ 53 55079490</h2>
        <h2>Holguín, Cuba</h2>
        <h2 className="text-xs">Desde 2020</h2>
        <Social></Social>
      </div>
    </div>
  );
};

export default Footer;
