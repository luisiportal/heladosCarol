import React from "react";

const TotalFactura = ({ total ,metoPago}) => {
  return (
    <div className="bg-neutral-100 w-2/5 rounded-xl p-2 flex flex-col  justify-center items-center">
      <h2>Total </h2>
      <h2>{total} {(metoPago == "CUP") ? " CUP" : " USD"}</h2>
    </div>
  );
};

export default TotalFactura;
