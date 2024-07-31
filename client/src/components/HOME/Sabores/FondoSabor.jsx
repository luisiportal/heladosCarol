import React from "react";

const FondoSabor = ({ sabor, color, width }) => {

  return (
    <div className={`${color} rounded-r-full ${width}`}>
      <h2 className="flex justify-center font-irish text-xl mb-4 py-1.5">
        {sabor}
      </h2>
     
    </div>
  );
};

export default FondoSabor;
