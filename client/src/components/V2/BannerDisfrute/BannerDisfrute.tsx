import React from "react";
import TituloModulo from "../DesingSystem/TituloModulo";

const BannerDisfrute = () => {
  return (
    <>
      <TituloModulo titulo="Un producto para el Disfrute en Familia" />

      <div className="flex justify-center gap-5 ">
        <div className="flex flex-col gap-5">
          {" "}
          <img
            className="rounded-xl object-cover w-36 h-24 shadow-md"
            src="/images/carusel/2.jpg"
            alt=""
          />{" "}
          <img
            className="rounded-xl object-cover w-36 h-24 shadow-md"
            src="/images/carusel/4.jpg"
            alt=""
          />
        </div>
        <div>
          {" "}
          <img
            className="rounded-xl object-cover w-44 h-[211px] shadow-md"
            src="/images/carusel/1.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default BannerDisfrute;
